from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import re
import uuid
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import httpx
from bson import ObjectId
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field


# -------------------- Configuration --------------------
MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
JWT_SECRET = os.environ["JWT_SECRET"]
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ["ADMIN_EMAIL"].lower()
ADMIN_PASSWORD = os.environ["ADMIN_PASSWORD"]
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
EMAIL_BASE_URL = "https://integrations.emergentagent.com"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Swar Shah Consulting API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# -------------------- Utils --------------------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=8),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = None
    if auth_header.startswith("Bearer "):
        token = auth_header[7:]
    if not token:
        token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    user["_id"] = str(user["_id"])
    user.pop("password_hash", None)
    return user


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text.strip("-")


async def send_email_async(to_email: str, subject: str, html: str, reply_to: Optional[str] = None) -> None:
    payload = {
        "to": [to_email],
        "subject": subject,
        "html": html,
        "from_name": EMAIL_FROM_NAME,
    }
    if reply_to:
        payload["contact_email"] = reply_to
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
    except Exception as e:  # noqa: BLE001
        logger.error(f"Email send failed: {e}")


# -------------------- Models --------------------
class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=120)
    budget: Optional[str] = Field(default=None, max_length=60)
    service: Optional[str] = Field(default=None, max_length=120)
    message: str = Field(..., min_length=5, max_length=4000)


class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=180)
    excerpt: str = Field(..., min_length=10, max_length=400)
    content: str = Field(..., min_length=20)
    cover_image: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    published: bool = True


class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None


# -------------------- Startup --------------------
@app.on_event("startup")
async def startup_event():
    await db.users.create_index("email", unique=True)
    await db.blog_posts.create_index("slug", unique=True)
    await db.blog_posts.create_index("created_at")
    await db.contact_submissions.create_index("created_at")

    existing = await db.users.find_one({"email": ADMIN_EMAIL})
    if existing is None:
        await db.users.insert_one({
            "email": ADMIN_EMAIL,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Swar Shah",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Seeded admin {ADMIN_EMAIL}")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one(
            {"email": ADMIN_EMAIL},
            {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}},
        )
        logger.info("Updated admin password hash from env")


@app.on_event("shutdown")
async def shutdown_event():
    client.close()


# -------------------- Routes --------------------
@api_router.get("/")
async def root():
    return {"message": "Swar Shah Consulting API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


# Auth
@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(str(user["_id"]), email)
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": email, "name": user.get("name"), "role": user.get("role")},
    }


@api_router.get("/auth/me")
async def me(current=Depends(get_current_admin)):
    return current


# Contact
@api_router.post("/contact")
async def submit_contact(payload: ContactRequest):
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "company": payload.company,
        "budget": payload.budget,
        "service": payload.service,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contact_submissions.insert_one(doc)

    html = f"""
    <table width='100%' cellpadding='0' cellspacing='0' style='font-family:Inter,Arial,sans-serif;background:#0a0a0a;padding:32px;color:#fff'>
      <tr><td>
        <h2 style='color:#fff;margin:0 0 24px'>New Consultation Request</h2>
        <p style='color:#a1a1aa'>You have a new inquiry from your website.</p>
        <table cellpadding='8' cellspacing='0' style='width:100%;background:#111;border-radius:12px;color:#fff;margin-top:16px'>
          <tr><td style='color:#71717a;width:120px'>Name</td><td>{payload.name}</td></tr>
          <tr><td style='color:#71717a'>Email</td><td>{payload.email}</td></tr>
          <tr><td style='color:#71717a'>Company</td><td>{payload.company or '—'}</td></tr>
          <tr><td style='color:#71717a'>Service</td><td>{payload.service or '—'}</td></tr>
          <tr><td style='color:#71717a'>Budget</td><td>{payload.budget or '—'}</td></tr>
          <tr><td style='color:#71717a;vertical-align:top'>Message</td><td>{payload.message}</td></tr>
        </table>
      </td></tr>
    </table>
    """
    await send_email_async(OWNER_EMAIL, f"New Consultation Request from {payload.name}", html, reply_to=payload.email)
    return {"status": "success", "id": doc["id"]}


@api_router.get("/contact/submissions")
async def list_contact_submissions(current=Depends(get_current_admin)):
    items = await db.contact_submissions.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


# Blog
def serialize_post(doc: dict) -> dict:
    doc["id"] = str(doc.pop("_id"))
    return doc


@api_router.get("/blog")
async def list_blog_posts(published_only: bool = True):
    query = {"published": True} if published_only else {}
    cursor = db.blog_posts.find(query).sort("created_at", -1)
    posts = []
    async for doc in cursor:
        posts.append(serialize_post(doc))
    return posts


@api_router.get("/blog/{slug}")
async def get_blog_post(slug: str):
    doc = await db.blog_posts.find_one({"slug": slug})
    if not doc:
        raise HTTPException(status_code=404, detail="Post not found")
    return serialize_post(doc)


@api_router.post("/blog", status_code=status.HTTP_201_CREATED)
async def create_blog_post(payload: BlogPostCreate, current=Depends(get_current_admin)):
    base_slug = slugify(payload.title)
    slug = base_slug
    n = 1
    while await db.blog_posts.find_one({"slug": slug}):
        n += 1
        slug = f"{base_slug}-{n}"
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "slug": slug,
        "title": payload.title,
        "excerpt": payload.excerpt,
        "content": payload.content,
        "cover_image": payload.cover_image,
        "tags": payload.tags,
        "published": payload.published,
        "author": current.get("name") or "Swar Shah",
        "created_at": now,
        "updated_at": now,
    }
    result = await db.blog_posts.insert_one(doc)
    doc["_id"] = result.inserted_id
    return serialize_post(doc)


@api_router.put("/blog/{post_id}")
async def update_blog_post(post_id: str, payload: BlogPostUpdate, current=Depends(get_current_admin)):
    try:
        oid = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post id")
    update = {k: v for k, v in payload.model_dump(exclude_none=True).items()}
    if not update:
        raise HTTPException(status_code=400, detail="No fields to update")
    if "title" in update:
        base_slug = slugify(update["title"])
        slug = base_slug
        n = 1
        while await db.blog_posts.find_one({"slug": slug, "_id": {"$ne": oid}}):
            n += 1
            slug = f"{base_slug}-{n}"
        update["slug"] = slug
    update["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.blog_posts.update_one({"_id": oid}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    doc = await db.blog_posts.find_one({"_id": oid})
    return serialize_post(doc)


@api_router.delete("/blog/{post_id}")
async def delete_blog_post(post_id: str, current=Depends(get_current_admin)):
    try:
        oid = ObjectId(post_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid post id")
    result = await db.blog_posts.delete_one({"_id": oid})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"status": "deleted"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

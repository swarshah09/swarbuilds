"""Backend API tests for Swar Shah Consulting site."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://swar-labs.preview.emergentagent.com").rstrip("/")
ADMIN_EMAIL = "admin@swarshah.dev"
ADMIN_PASSWORD = "SwarAdmin@2025"


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="session")
def admin_token(api):
    r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, f"admin login failed: {r.status_code} {r.text}"
    data = r.json()
    assert "access_token" in data and data["access_token"]
    return data["access_token"]


@pytest.fixture(scope="session")
def admin_headers(admin_token):
    return {"Authorization": f"Bearer {admin_token}", "Content-Type": "application/json"}


# ---------------- Health ----------------
class TestHealth:
    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health")
        assert r.status_code == 200
        assert r.json().get("status") == "ok"


# ---------------- Auth ----------------
class TestAuth:
    def test_login_success(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
        assert r.status_code == 200
        d = r.json()
        assert d["access_token"]
        assert d["user"]["email"] == ADMIN_EMAIL
        assert d["user"]["role"] == "admin"

    def test_login_wrong_password(self, api):
        r = api.post(f"{BASE_URL}/api/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong-password"})
        assert r.status_code == 401

    def test_me_with_token(self, api, admin_headers):
        r = api.get(f"{BASE_URL}/api/auth/me", headers=admin_headers)
        assert r.status_code == 200
        assert r.json()["email"] == ADMIN_EMAIL

    def test_me_without_token(self, api):
        s = requests.Session()  # fresh session (no auth headers)
        r = s.get(f"{BASE_URL}/api/auth/me")
        assert r.status_code == 401


# ---------------- Contact ----------------
class TestContact:
    submission_id = None

    def test_contact_success(self, api):
        payload = {
            "name": "TEST_Contact User",
            "email": "test_contact@example.com",
            "company": "Acme",
            "budget": "$1k-5k",
            "service": "AI Solutions",
            "message": "This is a test message from the automated test suite.",
        }
        r = api.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        assert d["status"] == "success"
        assert d.get("id")
        TestContact.submission_id = d["id"]

    def test_contact_missing_fields(self, api):
        r = api.post(f"{BASE_URL}/api/contact", json={"name": "x"})  # missing email/message
        assert r.status_code == 422

    def test_submissions_requires_admin(self, api):
        s = requests.Session()
        r = s.get(f"{BASE_URL}/api/contact/submissions")
        assert r.status_code == 401

    def test_submissions_admin_lists(self, api, admin_headers):
        r = api.get(f"{BASE_URL}/api/contact/submissions", headers=admin_headers)
        assert r.status_code == 200
        items = r.json()
        assert isinstance(items, list)
        # created submission should be present
        emails = [i.get("email") for i in items]
        assert "test_contact@example.com" in emails


# ---------------- Blog CRUD ----------------
class TestBlog:
    created_id = None
    created_slug = None

    def test_create_without_token(self, api):
        s = requests.Session()
        r = s.post(f"{BASE_URL}/api/blog", json={
            "title": "TEST no auth",
            "excerpt": "excerpt long enough",
            "content": "content long enough for the min",
        })
        assert r.status_code == 401

    def test_create_with_token(self, api, admin_headers):
        unique = uuid.uuid4().hex[:8]
        payload = {
            "title": f"TEST Post {unique}",
            "excerpt": "Automated test post excerpt.",
            "content": "Automated test post content body long enough.",
            "tags": ["test", "automation"],
            "published": True,
        }
        r = api.post(f"{BASE_URL}/api/blog", json=payload, headers=admin_headers)
        assert r.status_code == 201, r.text
        d = r.json()
        assert d["title"] == payload["title"]
        assert d.get("slug")
        assert d.get("id")
        TestBlog.created_id = d["id"]
        TestBlog.created_slug = d["slug"]

    def test_list_contains_created(self, api):
        r = api.get(f"{BASE_URL}/api/blog")
        assert r.status_code == 200
        posts = r.json()
        slugs = [p.get("slug") for p in posts]
        assert TestBlog.created_slug in slugs

    def test_get_by_slug(self, api):
        r = api.get(f"{BASE_URL}/api/blog/{TestBlog.created_slug}")
        assert r.status_code == 200
        assert r.json()["slug"] == TestBlog.created_slug

    def test_update(self, api, admin_headers):
        r = api.put(
            f"{BASE_URL}/api/blog/{TestBlog.created_id}",
            json={"excerpt": "Updated excerpt from test."},
            headers=admin_headers,
        )
        assert r.status_code == 200
        assert r.json()["excerpt"] == "Updated excerpt from test."

    def test_delete(self, api, admin_headers):
        r = api.delete(f"{BASE_URL}/api/blog/{TestBlog.created_id}", headers=admin_headers)
        assert r.status_code == 200
        # verify gone
        r2 = api.get(f"{BASE_URL}/api/blog/{TestBlog.created_slug}")
        assert r2.status_code == 404

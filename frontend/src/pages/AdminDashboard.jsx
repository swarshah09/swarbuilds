import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Plus, Trash2, Edit3, LogOut, Loader2, ExternalLink, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { api } from "@/lib/api";

const EMPTY = { title: "", excerpt: "", content: "", cover_image: "", tags: "", published: true };

export default function AdminDashboard() {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [tab, setTab] = useState("posts");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Admin Dashboard | Swar Shah";
    if (!authLoading && !user) navigate("/admin/login", { replace: true });
  }, [authLoading, user, navigate]);

  const loadPosts = async () => {
    const { data } = await api.get("/blog?published_only=false");
    setPosts(data);
  };
  const loadSubmissions = async () => {
    try {
      const { data } = await api.get("/contact/submissions");
      setSubmissions(data);
    } catch { /* not authorized */ }
  };

  useEffect(() => {
    if (user) { loadPosts(); loadSubmissions(); }
  }, [user]);

  const startCreate = () => { setEditing("new"); setForm(EMPTY); };
  const startEdit = (post) => {
    setEditing(post.id);
    setForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      cover_image: post.cover_image || "",
      tags: (post.tags || []).join(", "),
      published: post.published,
    });
  };
  const cancelEdit = () => { setEditing(null); setForm(EMPTY); };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        cover_image: form.cover_image || null,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
        published: !!form.published,
      };
      if (editing === "new") {
        await api.post("/blog", payload);
        toast.success("Post published");
      } else {
        await api.put(`/blog/${editing}`, payload);
        toast.success("Post updated");
      }
      await loadPosts();
      cancelEdit();
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (post) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    try {
      await api.delete(`/blog/${post.id}`);
      toast.success("Deleted");
      loadPosts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-500"><Loader2 className="animate-spin" size={20} /></div>;
  }

  return (
    <div className="min-h-screen" data-testid="admin-dashboard">
      <header className="border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-display font-bold text-white text-sm">S</div>
            <div>
              <div className="text-white font-medium text-sm">Admin</div>
              <div className="text-xs text-zinc-500">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"><ExternalLink size={12}/> View site</Link>
            <button onClick={handleLogout} className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1" data-testid="admin-logout"><LogOut size={12}/> Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <button onClick={() => setTab("posts")} className={`px-4 py-2 rounded-full text-sm border transition ${tab === "posts" ? "border-white/25 bg-white/5 text-white" : "border-white/5 text-zinc-500 hover:text-white"}`} data-testid="admin-tab-posts">Blog posts</button>
          <button onClick={() => setTab("submissions")} className={`px-4 py-2 rounded-full text-sm border transition ${tab === "submissions" ? "border-white/25 bg-white/5 text-white" : "border-white/5 text-zinc-500 hover:text-white"}`} data-testid="admin-tab-submissions">Contact submissions</button>
        </div>

        {tab === "posts" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-display text-2xl md:text-3xl font-semibold text-white">Posts <span className="text-zinc-600">({posts.length})</span></h1>
              {!editing && (
                <button onClick={startCreate} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition" data-testid="admin-new-post">
                  <Plus size={14}/> New post
                </button>
              )}
            </div>

            {editing && (
              <form onSubmit={save} className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6" data-testid="admin-post-form">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-semibold text-white">{editing === "new" ? "New post" : "Edit post"}</h2>
                  <button type="button" onClick={cancelEdit} className="text-zinc-500 hover:text-white"><X size={16}/></button>
                </div>
                <div className="space-y-4">
                  <input required placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB]" data-testid="post-title" />
                  <input placeholder="Cover image URL (optional)" value={form.cover_image} onChange={(e) => setForm({...form, cover_image: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB]" data-testid="post-cover" />
                  <textarea required placeholder="Excerpt (short summary)" rows={2} value={form.excerpt} onChange={(e) => setForm({...form, excerpt: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB] resize-none" data-testid="post-excerpt" />
                  <textarea required placeholder="Content (Markdown supported)" rows={14} value={form.content} onChange={(e) => setForm({...form, content: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono-alt text-sm focus:outline-none focus:border-[#2563EB] resize-none" data-testid="post-content" />
                  <input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({...form, tags: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB]" data-testid="post-tags" />
                  <label className="flex items-center gap-2 text-sm text-zinc-300">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({...form, published: e.target.checked})} data-testid="post-published" />
                    Published (visible on site)
                  </label>
                </div>
                <button type="submit" disabled={saving} className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition disabled:opacity-60" data-testid="post-save">
                  {saving ? <Loader2 size={14} className="animate-spin"/> : <Save size={14}/>}
                  {saving ? "Saving…" : "Save post"}
                </button>
              </form>
            )}

            <div className="space-y-3">
              {posts.length === 0 && !editing && (
                <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-500">No posts yet. Create your first article.</div>
              )}
              {posts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]" data-testid={`admin-post-${post.slug}`}>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${post.published ? "border-emerald-500/40 text-emerald-400" : "border-white/10 text-zinc-500"}`}>{post.published ? "Published" : "Draft"}</span>
                      <span className="text-xs text-zinc-500">/blog/{post.slug}</span>
                    </div>
                    <div className="text-white font-medium truncate">{post.title}</div>
                    <div className="text-xs text-zinc-500 truncate">{post.excerpt}</div>
                  </div>
                  <button onClick={() => startEdit(post)} className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-white hover:border-white/25" data-testid={`edit-${post.slug}`}><Edit3 size={14}/></button>
                  <button onClick={() => remove(post)} className="p-2 rounded-lg border border-white/10 text-zinc-400 hover:text-red-400 hover:border-red-500/40" data-testid={`delete-${post.slug}`}><Trash2 size={14}/></button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "submissions" && (
          <>
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6">Submissions <span className="text-zinc-600">({submissions.length})</span></h1>
            <div className="space-y-3">
              {submissions.length === 0 && <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-zinc-500">No submissions yet.</div>}
              {submissions.map((s) => (
                <div key={s.id} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5" data-testid={`submission-${s.id}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <div>
                      <div className="text-white font-medium">{s.name} <span className="text-zinc-500 font-normal">· {s.email}</span></div>
                      <div className="text-xs text-zinc-500">{s.company || "—"} · {s.service || "—"} · {s.budget || "—"}</div>
                    </div>
                    <span className="text-xs text-zinc-500">{new Date(s.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">{s.message}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

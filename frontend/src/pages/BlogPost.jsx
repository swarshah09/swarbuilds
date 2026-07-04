import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { api } from "@/lib/api";

function formatDate(iso) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }); }
  catch { return ""; }
}

// Very small markdown -> HTML: paragraphs, headings, bold, italic, code, lists, links.
function toHtml(md = "") {
  const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  let html = esc(md);
  html = html.replace(/```([\s\S]*?)```/g, (_,c) => `<pre><code>${c}</code></pre>`);
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/^###\s+(.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^##\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^#\s+(.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  // lists
  html = html.replace(/(?:^|\n)((?:- .+\n?)+)/g, (m) => {
    const items = m.trim().split("\n").map((l) => l.replace(/^- /,"").trim());
    return "\n<ul>" + items.map((i) => `<li>${i}</li>`).join("") + "</ul>\n";
  });
  // paragraphs
  html = html.split(/\n{2,}/).map((block) => {
    if (/^\s*<(h\d|ul|pre|blockquote)/.test(block)) return block;
    return `<p>${block.replace(/\n/g,"<br/>")}</p>`;
  }).join("\n");
  return html;
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/blog/${slug}`)
      .then((r) => { setPost(r.data); document.title = `${r.data.title} | Swar Shah`; })
      .catch(() => setError(true));
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-4">Article not found</h1>
          <Link to="/blog" className="text-[#06B6D4] hover:underline">← Back to journal</Link>
        </div>
      </div>
    );
  }

  if (!post) return <div className="min-h-screen flex items-center justify-center pt-24 text-zinc-500">Loading…</div>;

  return (
    <article className="pt-32 pb-24 min-h-screen" data-testid="blog-post-page">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white mb-8" data-testid="blog-back">
          <ArrowLeft size={14} /> Journal
        </Link>

        <div className="flex items-center gap-3 text-xs text-zinc-500 mb-4">
          <Calendar size={12} /><span>{formatDate(post.created_at)}</span>
          {post.tags?.map((t) => <span key={t} className="px-2 py-0.5 rounded-full border border-white/10 text-zinc-400">{t}</span>)}
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-white leading-tight">{post.title}</h1>
        <p className="text-zinc-400 mt-4 text-lg leading-relaxed">{post.excerpt}</p>

        {post.cover_image && (
          <div className="my-10 rounded-2xl overflow-hidden border border-white/5">
            <img src={post.cover_image} alt={post.title} className="w-full h-auto" />
          </div>
        )}

        <div className="prose-invert mt-8" dangerouslySetInnerHTML={{ __html: toHtml(post.content) }} />

        <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-[#2563EB]/10 via-[#7C3AED]/5 to-[#06B6D4]/10 p-10 text-center">
          <h3 className="font-display text-2xl font-semibold text-white mb-3">Have a project brewing?</h3>
          <p className="text-zinc-400 mb-6">Book a free consultation and let's talk business outcomes, not just tech.</p>
          <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition">
            Start a conversation
          </Link>
        </div>
      </div>
    </article>
  );
}

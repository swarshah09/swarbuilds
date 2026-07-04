import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/api";

function formatDate(iso) {
  if (!iso) return "";
  try { return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
  catch { return ""; }
}

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Journal | Swar Shah";
    api.get("/blog")
      .then((r) => setPosts(r.data))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen" data-testid="blog-list-page">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Journal</p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tighter text-white leading-tight">
            Thoughts & engineering notes.
          </h1>
          <p className="text-zinc-400 mt-4 text-lg">
            Practical writing on shipping software, AI in production and running consulting engagements that don't burn out.
          </p>
        </div>

        {loading ? (
          <div className="text-zinc-500">Loading articles…</div>
        ) : posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-14 text-center">
            <p className="text-zinc-400">No published articles yet. Come back soon.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-all h-full" data-testid={`blog-card-${post.slug}`}>
                  {post.cover_image && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={post.cover_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-zinc-500 mb-3">
                      <Calendar size={12} /><span>{formatDate(post.created_at)}</span>
                      {post.tags?.slice(0,1).map((t) => (<span key={t} className="px-2 py-0.5 rounded-full border border-white/10 text-zinc-400">{t}</span>))}
                    </div>
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-white mb-3">{post.title}</h2>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#06B6D4]">
                      Read article <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

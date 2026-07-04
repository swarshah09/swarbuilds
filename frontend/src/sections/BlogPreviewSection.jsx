import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { api } from "@/lib/api";

function formatDate(iso) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch { return ""; }
}

export default function BlogPreviewSection() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/blog").then((r) => setPosts(r.data.slice(0, 3))).catch(() => setPosts([]));
  }, []);

  return (
    <section id="blog" className="py-24 md:py-32 relative border-t border-white/5" data-testid="blog-preview-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Journal</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Thoughts on shipping software.
            </h2>
          </div>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition" data-testid="blog-view-all">
            View all articles
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/10 p-14 text-center">
            <p className="text-zinc-400">Fresh articles are on the way. In the meantime, browse case studies or book a consultation.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`} className="group block rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-all">
                  {post.cover_image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={post.cover_image} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                      <Calendar size={12} />
                      <span>{formatDate(post.created_at)}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-white transition">{post.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

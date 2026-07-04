import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/content";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 relative border-t border-white/5" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Featured projects</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              A few of my favourite builds.
            </h2>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm">
            Each engagement below started with a business problem — the tech was chosen to solve it, never the other way around.
          </p>
        </div>

        <div className="space-y-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className="group grid md:grid-cols-12 gap-6 rounded-3xl border border-white/5 bg-white/[0.02] overflow-hidden hover:border-white/15 transition-all"
              data-testid={`project-${p.slug}`}
            >
              <Link to={`/case-studies/${p.slug}`} className={`md:col-span-7 relative overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.cover}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 pointer-events-none" />
              </Link>

              <div className={`md:col-span-5 p-8 md:p-10 flex flex-col justify-center ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-3">{p.industry}</span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold text-white tracking-tight mb-3">{p.name}</h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">{p.tagline}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.slice(0, 4).map((s) => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-zinc-400">{s}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  {p.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <div className="font-display text-lg font-semibold text-white">{r.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-zinc-500">{r.label}</div>
                    </div>
                  ))}
                </div>
                <Link
                  to={`/case-studies/${p.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white group/link"
                  data-testid={`project-cta-${p.slug}`}
                >
                  Read case study
                  <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

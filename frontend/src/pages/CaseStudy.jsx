import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { PROJECTS } from "@/data/content";

export default function CaseStudy() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (project) document.title = `${project.name} — Case Study | Swar Shah`;
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <h1 className="font-display text-3xl text-white mb-4">Case study not found</h1>
          <Link to="/" className="text-[#06B6D4] hover:underline">← Back to home</Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-24" data-testid="case-study-page">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={project.cover} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 md:px-12 pb-16 w-full">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white mb-6" data-testid="case-back">
              <ArrowLeft size={14} /> All projects
            </Link>
            <span className="block text-xs uppercase tracking-[0.2em] text-[#06B6D4]">{project.industry}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tighter mt-3 leading-tight">{project.name}</h1>
            <p className="text-zinc-300 text-lg mt-4 max-w-2xl">{project.tagline}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 space-y-16">
        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4"
        >
          {project.results.map((r) => (
            <div key={r.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center">
              <div className="font-display text-2xl md:text-4xl font-bold text-white">{r.value}</div>
              <div className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">{r.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Problem */}
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-3">The problem</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">What we set out to fix.</h2>
          <p className="text-zinc-400 leading-relaxed text-lg">{project.problem}</p>
        </section>

        {/* Solution */}
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-3">The solution</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">What I built.</h2>
          <p className="text-zinc-400 leading-relaxed text-lg">{project.solution}</p>
        </section>

        {/* Features */}
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-3">Features</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6">Key capabilities.</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((f) => (
              <div key={f} className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <CheckCircle2 size={18} className="text-[#06B6D4] shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">{f}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section>
          <p className="text-xs uppercase tracking-[0.2em] text-[#06B6D4] mb-3">Tech stack</p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-white mb-6">Built with.</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-zinc-300">{s}</span>
            ))}
          </div>
        </section>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
          <a href={project.demo} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition" data-testid="case-live-demo">
            View live demo <ExternalLink size={14} />
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white hover:border-white/40 hover:bg-white/5 transition" data-testid="case-github">
            <Github size={14} /> GitHub
          </a>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#2563EB]/10 via-[#7C3AED]/5 to-[#06B6D4]/10 p-10 text-center mt-12">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-3">Have a project like this?</h3>
          <p className="text-zinc-400 mb-6">Let's talk about how I can help you ship something great.</p>
          <Link to="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition">
            Book a free consultation
          </Link>
        </div>
      </div>
    </article>
  );
}

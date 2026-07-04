import { motion } from "framer-motion";
import { SITE, VALUES } from "@/data/content";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative border-t border-white/5" data-testid="about-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-br from-[#2563EB]/40 via-[#7C3AED]/30 to-[#06B6D4]/40 blur-lg opacity-60" />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjB0ZWNoJTIwcG9ydHJhaXR8ZW58MHx8fHwxNzgzMTU2NTgzfDA&ixlib=rb-4.1.0&q=85"
                  alt="Swar Shah"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white font-display text-xl font-semibold">{SITE.name}</div>
                  <div className="text-zinc-300 text-xs mt-1">{SITE.role} · {SITE.location}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">About</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              I build software the way I'd want it built for my own business.
            </h2>
            <div className="mt-6 space-y-5 text-zinc-400 text-base md:text-lg leading-relaxed">
              <p>
                I'm Swar — a full stack and AI consultant based in {SITE.location}. By day I ship enterprise software for global banking clients at Synechron. Outside of that, I partner with founders and business owners to build revenue-driving products.
              </p>
              <p>
                My mission is simple: help ambitious businesses ship software that customers love and teams can maintain — without paying the agency tax. Every project I take on is scoped around a business outcome, not a feature list.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5">
                  <div className="font-display text-white font-semibold mb-2">{v.title}</div>
                  <p className="text-sm text-zinc-400 leading-relaxed">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

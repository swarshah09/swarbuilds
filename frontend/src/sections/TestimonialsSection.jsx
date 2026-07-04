import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/content";

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 md:py-32 relative border-t border-white/5" data-testid="testimonials-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            The best briefs come with a track record.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/5 bg-white/[0.02] p-8 hover:border-white/15 transition-all"
              data-testid={`testimonial-${i}`}
            >
              <Quote size={22} className="text-[#06B6D4]/50 mb-4" />
              <p className="text-zinc-200 text-base md:text-lg leading-relaxed font-light">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/5">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <div>
                  <div className="text-sm text-white font-medium">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

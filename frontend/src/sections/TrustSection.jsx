import { motion } from "framer-motion";
import { Building2, Zap, Sparkles, Timer, Boxes, Globe2 } from "lucide-react";
import { TRUST_BADGES } from "@/data/content";

const ICONS = [Building2, Boxes, Sparkles, Timer, Zap, Globe2];

export default function TrustSection() {
  return (
    <section className="relative py-20 border-y border-white/5 bg-black/40" data-testid="trust-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-zinc-500 mb-10">
          Enterprise experience · Startup speed
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TRUST_BADGES.map((b, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition"
              >
                <Icon size={16} className="text-[#06B6D4] shrink-0" />
                <span className="text-xs md:text-sm text-zinc-300 leading-tight">{b.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

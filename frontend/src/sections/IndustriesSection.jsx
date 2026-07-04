import { motion } from "framer-motion";
import { Home, HeartPulse, Dumbbell, Landmark, Rocket, UtensilsCrossed } from "lucide-react";
import { INDUSTRIES } from "@/data/content";

const ICONS = { Home, HeartPulse, Dumbbell, Landmark, Rocket, UtensilsCrossed };

export default function IndustriesSection() {
  return (
    <section className="py-24 md:py-32 relative" data-testid="industries-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Industries served</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Trusted across sectors where <span className="text-brand-gradient">software</span> is the difference.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {INDUSTRIES.map((ind, i) => {
            const Icon = ICONS[ind.icon];
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.06 }}
                className="group flex flex-col items-center justify-center gap-3 px-4 py-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-default"
                data-testid={`industry-${ind.name.toLowerCase().replace(/\s+/g,"-")}`}
              >
                <div className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#06B6D4] group-hover:border-[#06B6D4]/40 transition-colors">
                  <Icon size={18} />
                </div>
                <span className="text-sm text-zinc-300 font-medium">{ind.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

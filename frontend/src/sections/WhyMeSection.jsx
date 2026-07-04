import { motion } from "framer-motion";
import { MessageSquare, Target, Code2, Sparkles, LifeBuoy, PenTool } from "lucide-react";
import { WHY_ME } from "@/data/content";

const ICONS = { MessageSquare, Target, Code2, Sparkles, LifeBuoy, PenTool };

export default function WhyMeSection() {
  return (
    <section className="py-24 md:py-32 relative border-t border-white/5" data-testid="why-me-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Why work with me</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              A senior consultant, not a freelance dev.
            </h2>
            <p className="text-zinc-400 mt-6 text-base md:text-lg leading-relaxed">
              I take on a small number of clients each quarter so every engagement gets senior attention — from strategy to code to launch.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">10×</div>
                <p className="text-xs text-zinc-500 mt-1">Faster than typical agency delivery</p>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white">100%</div>
                <p className="text-xs text-zinc-500 mt-1">Code and IP ownership to clients</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {WHY_ME.map((item, i) => {
              const Icon = ICONS[item.icon];
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: i * 0.06 }}
                  className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:border-white/15 hover:bg-white/[0.04] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#06B6D4] mb-4 group-hover:bg-[#2563EB]/10 group-hover:border-[#2563EB]/30 transition">
                    <Icon size={16} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

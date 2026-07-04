import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/data/content";

export default function ProcessSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 40%", "end 60%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-24 md:py-32 relative border-t border-white/5" data-testid="process-section">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">The process</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            How great software gets shipped.
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            No mystery boxes. Weekly demos. Every phase mapped to your goals.
          </p>
        </div>

        <div ref={ref} className="relative pl-8 md:pl-16">
          <div className="absolute left-2 md:left-6 top-0 bottom-0 w-px bg-white/5" />
          <motion.div
            className="absolute left-2 md:left-6 top-0 w-px bg-gradient-to-b from-[#2563EB] via-[#7C3AED] to-[#06B6D4]"
            style={{ height: lineHeight }}
          />
          <div className="space-y-10">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.06 }}
                className="relative"
              >
                <div className="absolute -left-[26px] md:-left-[42px] top-1 w-4 h-4 rounded-full bg-black border-2 border-white/20 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                </div>
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="text-xs font-mono-alt text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xl">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

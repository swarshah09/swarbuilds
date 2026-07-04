import Marquee from "react-fast-marquee";
import { TECH_STACK } from "@/data/content";
import {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiSpringboot,
  SiMongodb, SiPostgresql, SiDocker, SiTailwindcss, SiPython, SiGraphql, SiRedis
} from "react-icons/si";
import { FaAws, FaJava } from "react-icons/fa";
import { Sparkles as LuSparkles } from "lucide-react";

const ICON_MAP = {
  SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, FaJava, SiSpringboot,
  SiMongodb, SiPostgresql, FaAws, SiDocker, LuSparkles, SiTailwindcss,
  SiPython, SiGraphql, SiRedis,
};

export default function TechStackSection() {
  return (
    <section className="py-24 md:py-32 relative border-t border-white/5 overflow-hidden" data-testid="tech-stack-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Tech stack</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Modern, boring, battle-tested.
          </h2>
          <p className="text-zinc-400 mt-4">
            The tools I trust to ship reliably — chosen for your business, not for my portfolio.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        <Marquee gradient={false} speed={40} pauseOnHover>
          {TECH_STACK.concat(TECH_STACK).map((tech, i) => {
            const Icon = ICON_MAP[tech.icon];
            return (
              <div key={i} className="mx-6 group">
                <div className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04] transition-all">
                  {Icon && <Icon size={28} className="text-zinc-500 group-hover:text-white transition-colors" />}
                  <span className="font-display text-lg text-zinc-400 group-hover:text-white transition-colors">{tech.name}</span>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
}

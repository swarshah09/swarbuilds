import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiReact, SiNodedotjs, SiPython, SiTypescript, SiMongodb } from "react-icons/si";
import { Sparkles as SiOpenai } from "lucide-react";
import { FaAws, FaJava } from "react-icons/fa";

const FloatingIcon = ({ Icon, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8 }}
    className={`absolute floaty ${className}`}
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center text-white/80 hover:text-white transition">
      <Icon size={24} />
    </div>
  </motion.div>
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" data-testid="hero-section">
      <div className="absolute inset-0 hero-glow pointer-events-none" />
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Floating tech icons */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <FloatingIcon Icon={SiReact} className="top-32 left-[8%]" delay={0.2} />
        <FloatingIcon Icon={SiNodedotjs} className="top-1/3 right-[10%]" delay={0.6} />
        <FloatingIcon Icon={FaAws} className="bottom-40 left-[12%]" delay={1.0} />
        <FloatingIcon Icon={SiTypescript} className="bottom-32 right-[8%]" delay={1.4} />
        <FloatingIcon Icon={SiMongodb} className="top-1/2 left-[4%]" delay={0.8} />
        <FloatingIcon Icon={SiOpenai} className="top-24 right-[20%]" delay={1.2} />
        <FloatingIcon Icon={FaJava} className="bottom-24 right-[22%]" delay={1.6} />
        <FloatingIcon Icon={SiPython} className="top-40 left-[22%]" delay={1.8} />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm mb-8"
        >
          <Sparkles size={12} className="text-[#06B6D4]" />
          <span className="text-xs text-zinc-300 tracking-wide">Currently accepting 2 new clients this quarter</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.05] max-w-5xl mx-auto"
        >
          Helping businesses build{" "}
          <span className="text-brand-gradient">software</span>{" "}
          that drives growth.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-8 text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          I design and develop modern websites, AI-powered applications and automation systems that help businesses save time, increase revenue and deliver better customer experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all"
            data-testid="hero-primary-cta"
          >
            Book free consultation
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-white hover:border-white/40 hover:bg-white/5 transition-all"
            data-testid="hero-secondary-cta"
          >
            View case studies
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {[
            { v: "50+", l: "Products shipped" },
            { v: "6+", l: "Industries served" },
            { v: "4.9★", l: "Client satisfaction" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-semibold text-white">{s.v}</div>
              <div className="text-xs text-zinc-500 mt-1">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

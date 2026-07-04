import { useRef } from "react";
import { motion } from "framer-motion";
import { Globe, Layers, Sparkles, Workflow, LayoutDashboard, Palette, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/content";

const ICONS = { Globe, Layers, Sparkles, Workflow, LayoutDashboard, Palette, ShieldCheck };

function ServiceCard({ service, className = "" }) {
  const Icon = ICONS[service.icon];
  const ref = useRef(null);

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    ref.current.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={`shine group relative rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-white/[0.01] p-8 hover:border-white/15 transition-all cursor-default ${className}`}
      data-testid={`service-${service.slug}`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#2563EB]/10 group-hover:border-[#2563EB]/30 group-hover:text-[#06B6D4] transition-all">
          <Icon size={18} />
        </div>
        <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-white tracking-tight mb-2">{service.title}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4">{service.description}</p>
      <ul className="space-y-2">
        {service.bullets.map((b) => (
          <li key={b} className="text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#06B6D4]" />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 sm:py-24 md:py-32 relative" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Services</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Software that moves your business — end to end.
          </h2>
          <p className="text-zinc-400 mt-4 text-base md:text-lg leading-relaxed">
            From your first landing page to production-grade AI systems. Every engagement is scoped to your business outcomes, not deliverables on a spreadsheet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard service={SERVICES[0]} className="lg:col-span-2" />
          <ServiceCard service={SERVICES[1]} />
          <ServiceCard service={SERVICES[2]} />
          <ServiceCard service={SERVICES[3]} />
          <ServiceCard service={SERVICES[4]} />
          <ServiceCard service={SERVICES[5]} />
          <ServiceCard service={SERVICES[6]} className="md:col-span-2 lg:col-span-1" />
        </div>
      </div>
    </section>
  );
}

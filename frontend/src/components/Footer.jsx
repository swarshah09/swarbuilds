import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { SITE } from "@/data/content";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-black" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="mb-20">
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-[1.05]">
            Let's build<br />
            <span className="text-brand-gradient">something great.</span>
          </h2>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition"
            data-testid="footer-cta"
          >
            Book a free consultation →
          </a>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-white/5">
          <div className="sm:col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-display font-bold text-white text-sm">S</div>
              <span className="font-display font-semibold text-white text-lg">{SITE.name}</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              {SITE.role} helping businesses ship software that increases revenue, saves time and automates operations.
            </p>
            <p className="text-zinc-600 text-xs mt-4">{SITE.location}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Sitemap</p>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-zinc-400 hover:text-white transition">Home</Link></li>
              <li><a href="/#services" className="text-zinc-400 hover:text-white transition">Services</a></li>
              <li><a href="/#projects" className="text-zinc-400 hover:text-white transition">Case Studies</a></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-white transition">Blog</Link></li>
              <li><a href="/#contact" className="text-zinc-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Contact</p>
            <ul className="space-y-3 text-sm">
              <li><a href={`mailto:${SITE.email}`} className="text-zinc-400 hover:text-white transition break-all">{SITE.email}</a></li>
              <li><a href={`https://wa.me/${SITE.whatsapp.replace("+","")}`} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition">{SITE.whatsappDisplay}</a></li>
            </ul>
            <div className="flex items-center gap-3 mt-6">
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition" data-testid="social-linkedin"><Linkedin size={16} /></a>
              <a href={SITE.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition" data-testid="social-github"><Github size={16} /></a>
              <a href={`mailto:${SITE.email}`} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition" data-testid="social-email"><Mail size={16} /></a>
              <a href={`https://wa.me/${SITE.whatsapp.replace("+","")}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:border-white/30 transition" data-testid="social-whatsapp"><MessageCircle size={16} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-16 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-xs text-zinc-600">Crafted with intention in {SITE.location}.</p>
        </div>
      </div>
    </footer>
  );
}

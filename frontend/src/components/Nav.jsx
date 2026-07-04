import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SITE } from "@/data/content";

const NAV_ITEMS = [
  { label: "Services", to: "/#services" },
  { label: "Projects", to: "/#projects" },
  { label: "Process", to: "/#process" },
  { label: "About", to: "/#about" },
  { label: "Blog", to: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  const handleAnchor = (e, to) => {
    if (to.startsWith("/#")) {
      const id = to.slice(2);
      if (location.pathname === "/") {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-black/60 border-b border-white/5" : "bg-transparent"
      }`}
      data-testid="site-nav"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" data-testid="nav-logo">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-display font-bold text-white text-sm">S</div>
          <span className="font-display font-semibold text-white text-lg tracking-tight">{SITE.name}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.to}
              onClick={(e) => handleAnchor(e, item.to)}
              className="text-sm text-zinc-400 hover:text-white transition-colors link-underline"
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            onClick={(e) => handleAnchor(e, "/#contact")}
            className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            data-testid="nav-contact-cta"
          >
            Book consultation
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-black/90 backdrop-blur-xl"
          >
            <div className="px-6 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => handleAnchor(e, item.to)}
                  className="block text-zinc-300 hover:text-white text-base"
                  data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleAnchor(e, "/#contact")}
                className="inline-block px-5 py-2 rounded-full bg-white text-black text-sm font-medium"
              >
                Book consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

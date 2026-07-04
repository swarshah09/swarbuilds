import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleClick}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 group flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full bg-white text-black font-medium text-xs md:text-sm shadow-2xl hover:shadow-[0_0_40px_rgba(37,99,235,0.35)] transition-all"
          data-testid="sticky-cta"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
          </span>
          <span className="hidden xs:inline sm:inline">Let's build something</span>
          <span className="inline xs:hidden sm:hidden">Let's talk</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

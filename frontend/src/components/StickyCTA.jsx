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
          className="fixed bottom-6 right-6 z-40 group flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-medium text-sm shadow-2xl hover:shadow-[0_0_40px_rgba(37,99,235,0.35)] transition-all"
          data-testid="sticky-cta"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563EB]"></span>
          </span>
          Let's build something
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

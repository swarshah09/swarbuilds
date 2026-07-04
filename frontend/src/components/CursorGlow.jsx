import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    setVisible(true);
    const onMove = (e) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!visible) return null;
  return <div ref={ref} className="cursor-glow" aria-hidden />;
}

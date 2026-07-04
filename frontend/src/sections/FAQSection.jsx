import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/content";

export default function FAQSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 relative border-t border-white/5" data-testid="faq-section">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <div className="mb-14">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Frequently asked</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Everything you'd want to know before we start.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/5" data-testid={`faq-item-${i}`}>
                <AccordionTrigger className="text-left text-white font-display text-lg md:text-xl font-medium py-6 hover:no-underline hover:text-white/90">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-400 leading-relaxed text-base pb-6">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

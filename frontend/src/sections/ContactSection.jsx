import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin, Github, MapPin, Calendar, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { SITE, SERVICES } from "@/data/content";

const BUDGETS = ["Under ₹1L", "₹1L – ₹3L", "₹3L – ₹6L", "₹6L – ₹10L", "₹10L+"];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/contact", form);
      toast.success("Thanks! I'll get back to you within 24 hours.");
      setForm({ name: "", email: "", company: "", service: "", budget: "", message: "" });
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative border-t border-white/5" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">Let's talk</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Book a free 30-minute consultation.
            </h2>
            <p className="text-zinc-400 mt-6 text-base md:text-lg leading-relaxed">
              Tell me a bit about your business and I'll come to the call with a clear point of view on how software can help you grow, save time, or both.
            </p>

            <div className="mt-10 space-y-4">
              <a href={SITE.calendly} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition group" data-testid="contact-calendly">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center text-white"><Calendar size={18} /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium">Schedule a call</div>
                  <div className="text-xs text-zinc-500 truncate">30 min · Zoom or Google Meet</div>
                </div>
              </a>

              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/15 transition group" data-testid="contact-email-btn">
                <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-[#06B6D4]"><Mail size={18} /></div>
                <div><div className="text-sm text-white">Email</div><div className="text-xs text-zinc-500 break-all">{SITE.email}</div></div>
              </a>

              <a href={`https://wa.me/${SITE.whatsapp.replace("+","")}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 hover:border-white/15 transition group" data-testid="contact-whatsapp-btn">
                <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-[#06B6D4]"><MessageCircle size={18} /></div>
                <div><div className="text-sm text-white">WhatsApp</div><div className="text-xs text-zinc-500">{SITE.whatsappDisplay}</div></div>
              </a>

              <div className="flex gap-3 pt-2">
                <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 hover:border-white/15 transition text-sm text-zinc-300"><Linkedin size={14}/> LinkedIn</a>
                <a href={SITE.github} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-white/5 hover:border-white/15 transition text-sm text-zinc-300"><Github size={14}/> GitHub</a>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 pt-4">
                <MapPin size={12} /> Based in {SITE.location} — working with clients globally.
              </div>
            </div>
          </div>

          <motion.form
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-10"
            data-testid="contact-form"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Your name *</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="contact-name" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@company.com" className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="contact-email" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Company (optional)</label>
                <input name="company" value={form.company} onChange={handleChange} placeholder="Acme Inc." className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="contact-company" />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-2 block">Service</label>
                <select name="service" value={form.service} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]" data-testid="contact-service">
                  <option value="">Select a service</option>
                  {SERVICES.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-zinc-400 mb-2 block">Budget range</label>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setForm({ ...form, budget: b })}
                    className={`px-3 py-1.5 rounded-full text-xs border transition ${form.budget === b ? "border-[#2563EB] bg-[#2563EB]/10 text-white" : "border-white/10 text-zinc-400 hover:border-white/25"}`}
                    data-testid={`budget-${b.replace(/\s+/g,"-")}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-xs text-zinc-400 mb-2 block">Tell me about your project *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="What are you building? What outcome would make this a home run?" className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] resize-none" data-testid="contact-message" />
            </div>

            <button type="submit" disabled={loading} className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-60" data-testid="contact-submit">
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {loading ? "Sending..." : "Send message"}
            </button>
            <p className="text-xs text-zinc-500 mt-4 text-center">I reply within 24 hours, usually much faster.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/components/providers/motion-provider";
import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/yashrana240203@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || `Portfolio contact from ${form.name}`,
          message: form.message,
          _subject: `[Portfolio] ${form.subject || `Message from ${form.name}`}`,
          _captcha: "false",
          _template: "table",
        }),
      });

      const data = await res.json();

      if (data.success === "true" || data.success === true) {
        setStatus("sent");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p variants={staggerItem} className="text-xs font-mono tracking-[0.2em] uppercase text-white/40 mb-4">
            06 — Contact
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
          >
            Let&apos;s build
            <br />
            <span className="text-white/20">something great.</span>
          </motion.h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-white/40 text-base leading-relaxed mb-10">
              Open to full-time roles, research collaborations, and interesting builds.
              Drop a message — I reply within 24 hours.
            </p>

            <div className="space-y-2 mb-10">
              {[
                { icon: "✉", label: "yashrana240203@gmail.com", href: "mailto:yashrana240203@gmail.com" },
                { icon: "⬡", label: "github.com/ranayash24", href: "https://github.com/ranayash24" },
                { icon: "in", label: "linkedin.com/in/yash-rana", href: "https://www.linkedin.com/in/yash-rana" },
                { icon: "📍", label: "Montréal, QC, Canada", href: null },
              ].map(({ icon, label, href }, i) => {
                const inner = (
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/8 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all group">
                    <span className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-sm text-white/30 group-hover:text-white/60 transition-colors shrink-0">
                      {icon}
                    </span>
                    <span className="text-white/40 text-sm font-mono group-hover:text-white/65 transition-colors">
                      {label}
                    </span>
                  </div>
                );
                return href ? (
                  <a key={i} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={i}>{inner}</div>
                );
              })}
            </div>

            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all"
            >
              Download Resume ↓
            </a>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-20 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-semibold text-white">Message sent</h3>
                <p className="text-white/40 text-sm max-w-xs leading-relaxed">
                  Your message is on its way to{" "}
                  <span className="text-white/60 font-mono">yashrana240203@gmail.com</span>.
                  Expect a reply within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/30 text-[11px] font-mono uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-white/30 text-[11px] font-mono uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/30 text-[11px] font-mono uppercase tracking-wider mb-1.5">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-white/30 text-[11px] font-mono uppercase tracking-wider mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell me about your project, role, or idea..."
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`w-full py-4 rounded-xl text-sm font-semibold transition-all ${
                    status === "error"
                      ? "bg-red-500/15 border border-red-500/30 text-red-300"
                      : "bg-white text-black hover:bg-white/90 disabled:opacity-50"
                  }`}
                >
                  {status === "sending"
                    ? "Sending..."
                    : status === "error"
                    ? "Failed — try emailing directly"
                    : "Send Message →"}
                </button>

                <p className="text-center text-white/20 text-[11px] font-mono">
                  Delivered to yashrana240203@gmail.com
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

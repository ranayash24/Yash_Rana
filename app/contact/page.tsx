"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
} from "@/components/providers/motion-provider";
import { useRef, useState } from "react";
import {
  contactEmail,
  emailDeliveryConfigured,
  sendContactEmail,
} from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const sending = useRef(false);
  const directEmail = `mailto:${contactEmail}?subject=${encodeURIComponent(form.subject || "Portfolio enquiry")}&body=${encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`)}`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending.current || !emailDeliveryConfigured) return;
    if (!form.name.trim() || !form.message.trim()) {
      setStatus("error");
      return;
    }
    if (new FormData(e.currentTarget).get("bot-field")) {
      setStatus("error");
      return;
    }
    sending.current = true;
    setStatus("sending");

    try {
      await sendContactEmail(form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      sending.current = false;
    }
  };

  return (
    <div className="interior-page min-h-screen pt-20">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.p
            variants={staggerItem}
            className="text-xs font-mono tracking-[0.2em] uppercase text-muted mb-4"
          >
            06 — Contact
          </motion.p>
          <motion.h1
            variants={staggerItem}
            className="text-5xl md:text-7xl font-bold text-white leading-none tracking-tight"
          >
            Let&apos;s build
            <br />
            <span className="text-muted">something great.</span>
          </motion.h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-muted text-base leading-relaxed mb-10">
              Currently at GEXEL and open to applied ML, generative AI, and
              software engineering opportunities. Based in Montréal, open to
              relocating to Toronto, and eligible to work in Canada (PGWP). Tell
              me about the role, collaboration, or idea you have in mind.
            </p>

            <div className="space-y-2 mb-10">
              {[
                {
                  icon: "✉",
                  label: "yashrana2402@gmail.com",
                  href: "mailto:yashrana2402@gmail.com",
                },
                {
                  icon: "⬡",
                  label: "github.com/ranayash24",
                  href: "https://github.com/ranayash24",
                },
                {
                  icon: "in",
                  label: "Connect on LinkedIn",
                  href: "https://www.linkedin.com/in/yash-rana-a5b4b9214/",
                },
                { icon: "📍", label: "Montréal, QC, Canada", href: null },
              ].map(({ icon, label, href }, i) => {
                const inner = (
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all group">
                    <span className="w-8 h-8 rounded-full border border-white/12 flex items-center justify-center text-sm text-muted group-hover:text-white/60 transition-colors shrink-0">
                      {icon}
                    </span>
                    <span className="text-muted text-sm font-mono group-hover:text-white/65 transition-colors">
                      {label}
                    </span>
                  </div>
                );
                return href ? (
                  <a
                    key={i}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="block"
                  >
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
            <a
              href="/resume-software-development.pdf"
              download
              className="text-link block mt-5"
            >
              Software development résumé ↗
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
                <h3 role="status" className="text-xl font-semibold text-white">
                  Message sent
                </h3>
                <p className="text-muted text-sm max-w-xs leading-relaxed">
                  Thank you for getting in touch. Your message was accepted for
                  sending.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-link"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                name="contact"
                aria-busy={status === "sending"}
                className="space-y-4"
              >
                {!emailDeliveryConfigured && (
                  <p className="text-muted text-sm leading-relaxed">
                    Write your message below, then open it in your email app to
                    send it directly to me.
                  </p>
                )}
                <input type="hidden" name="bot-field" />

                <fieldset disabled={status === "sending"} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-muted text-[11px] font-mono uppercase tracking-wider mb-1.5"
                      >
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        maxLength={120}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-muted text-[11px] font-mono uppercase tracking-wider mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        maxLength={254}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-muted text-[11px] font-mono uppercase tracking-wider mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      maxLength={200}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-muted text-[11px] font-mono uppercase tracking-wider mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Tell me about your project, role, or idea..."
                      required
                      maxLength={10000}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted text-sm focus:border-white/25 focus:bg-white/[0.05] transition-all outline-none resize-none"
                    />
                  </div>

                  {emailDeliveryConfigured ? (
                    <button
                      aria-live="polite"
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
                          ? "Try again →"
                          : "Send Message →"}
                    </button>
                  ) : (
                    <a
                      href={directEmail}
                      className="block w-full py-4 rounded-xl text-sm font-semibold text-center bg-white text-black hover:bg-white/90 transition-all"
                    >
                      Open email app →
                    </a>
                  )}
                </fieldset>

                {status === "error" && (
                  <p
                    role="alert"
                    className="text-sm text-red-300 leading-relaxed"
                  >
                    We couldn&apos;t confirm that your message was sent. Your
                    text is still here. Try again or{" "}
                    <a
                      href={directEmail}
                      className="underline underline-offset-4"
                    >
                      open it in your email app
                    </a>
                    .
                  </p>
                )}

                <p className="text-center text-muted text-[11px] font-mono">
                  Or email{" "}
                  <a
                    href={directEmail}
                    className="underline underline-offset-4"
                  >
                    {contactEmail}
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

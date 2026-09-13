"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTED = [
  "What are your top skills?",
  "Tell me about your experience",
  "What projects have you built?",
  "Are you open to work?",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Yash's AI assistant. Ask me anything about his background, skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sendingRef = useRef(false);

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  // Always scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 220);
    return () => clearTimeout(timer);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || sendingRef.current || text.length > 4000) return;
    sendingRef.current = true;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
        signal: controller.signal,
      });

      const data = await res.json();
      if (!res.ok || typeof data.reply !== "string" || !data.reply.trim())
        throw new Error("Request failed");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Sorry, I could not process that.",
        },
      ]);
    } catch (err: unknown) {
      const isAbort = err instanceof Error && err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isAbort
            ? "Response timed out. Please try again."
            : "Something went wrong. Please try again or email yashrana2402@gmail.com.",
        },
      ]);
    } finally {
      clearTimeout(timeout);
      sendingRef.current = false;
      setLoading(false);
    }
  };

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* Floating button */}
      <motion.button
        ref={triggerRef}
        aria-expanded={open}
        aria-controls="portfolio-chat"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle AI chat"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          zIndex: 45,
          background: open ? "#1b1c17" : "#b96b36",
          border: open ? "1px solid rgba(212,139,85,0.35)" : "none",
          boxShadow: open
            ? "0 4px 20px rgba(0,0,0,0.6)"
            : "0 4px 28px rgba(212,139,85,0.5)",
        }}
        whileHover={{ scale: 1.09 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="x"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(212,139,85,0.9)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chatpanel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.25, 0.4, 0.25, 1] }}
            id="portfolio-chat"
            role="dialog"
            aria-label="Yash’s portfolio assistant"
            className="fixed bottom-24 right-6 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: "360px",
              maxWidth: "calc(100vw - 3rem)",
              height: "520px",
              maxHeight: "calc(100vh - 8rem)",
              background: "#1b1c17",
              border: "1px solid rgba(212,139,85,0.2)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,139,85,0.05)",
              zIndex: 45,
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{
                borderBottom: "1px solid rgba(212,139,85,0.1)",
                background: "rgba(212,139,85,0.04)",
              }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-mono font-bold"
                  style={{
                    background: "rgba(212,139,85,0.18)",
                    border: "1px solid rgba(212,139,85,0.3)",
                    color: "#FF9A40",
                  }}
                >
                  AI
                </div>
                {/* Online dot */}
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0c0c0c]"
                  style={{ background: "#22c55e" }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold leading-tight">
                  Yash&apos;s AI Assistant
                </p>
                <p
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(237,156,101,0.95)" }}
                >
                  Portfolio assistant
                </p>
              </div>

              <button
                onClick={() => {
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.6)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.25)")
                }
                aria-label="Close"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Messages — flex-1 + min-h-0 makes scroll work ── */}
            <div
              ref={scrollRef}
              className="chat-messages flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(212,139,85,0.2) transparent",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {/* Bot avatar on left */}
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-mono font-bold shrink-0 mb-0.5"
                      style={{
                        background: "rgba(212,139,85,0.15)",
                        border: "1px solid rgba(212,139,85,0.25)",
                        color: "#FF9A40",
                      }}
                    >
                      AI
                    </div>
                  )}

                  <div
                    className="max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === "user"
                        ? {
                            background:
                              "linear-gradient(135deg, #d48b55, #FF8C00)",
                            color: "#fff",
                            borderRadius: "18px 18px 4px 18px",
                          }
                        : {
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(212,139,85,0.1)",
                            color: "rgba(255,255,255,0.75)",
                            borderRadius: "18px 18px 18px 4px",
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex items-end gap-2 justify-start">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-mono font-bold shrink-0"
                    style={{
                      background: "rgba(212,139,85,0.15)",
                      border: "1px solid rgba(212,139,85,0.25)",
                      color: "#FF9A40",
                    }}
                  >
                    AI
                  </div>
                  <div
                    className="px-4 py-3"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(212,139,85,0.1)",
                      borderRadius: "18px 18px 18px 4px",
                    }}
                  >
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#d48b55" }}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.7,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Suggested questions ── */}
            <AnimatePresence>
              {showSuggestions && (
                <motion.div
                  key="suggestions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0"
                  style={{ borderTop: "1px solid rgba(212,139,85,0.06)" }}
                >
                  <p className="w-full text-[10px] font-mono text-white/60 pt-2 pb-0.5">
                    Try asking:
                  </p>
                  {SUGGESTED.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full transition-all"
                      style={{
                        background: "rgba(212,139,85,0.07)",
                        border: "1px solid rgba(212,139,85,0.18)",
                        color: "rgba(255,150,60,0.85)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(212,139,85,0.16)";
                        e.currentTarget.style.color = "#FF9A40";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(212,139,85,0.07)";
                        e.currentTarget.style.color = "rgba(255,150,60,0.85)";
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div
              className="px-4 pb-4 pt-2 shrink-0"
              style={{ borderTop: "1px solid rgba(212,139,85,0.08)" }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,139,85,0.15)",
                }}
                onFocusCapture={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(212,139,85,0.4)")
                }
                onBlurCapture={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(212,139,85,0.15)")
                }
              >
                <input
                  aria-label="Ask about Yash"
                  maxLength={4000}
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Yash..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-sm outline-none min-w-0 placeholder:text-white/60"
                  style={{ color: "rgba(255,255,255,0.88)" }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 disabled:opacity-25"
                  style={{ background: "#d48b55" }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Send"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

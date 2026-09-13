import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { PORTFOLIO_DOCUMENTS } from "@/lib/portfolioData";

export const runtime = "nodejs";

const PORTFOLIO_CONTEXT = PORTFOLIO_DOCUMENTS.map((d) => d.text).join(
  "\n\n---\n\n",
);

const SYSTEM_PROMPT = `You are Yash Rana's AI portfolio assistant on his personal website. You answer questions about Yash based solely on the information below.

Rules:
- Be friendly, concise, and professional
- Answer only about Yash — politely decline unrelated topics
- If information isn't in the context, say you don't have it and suggest emailing yashrana2402@gmail.com
- Keep responses short and scannable (2-4 sentences max unless listing items)

--- YASH'S PORTFOLIO DATA ---
${PORTFOLIO_CONTEXT}
--- END OF DATA ---`;

// Groq is OpenAI-API compatible — just swap the baseURL and model
let client: OpenAI | null = null;

function getClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY!,
      baseURL: "https://api.groq.com/openai/v1",
      timeout: 20000,
      maxRetries: 0,
    });
  }
  return client;
}

export async function POST(req: NextRequest) {
  let data;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON request" },
      { status: 400 },
    );
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return NextResponse.json(
      { error: "Invalid chat request" },
      { status: 400 },
    );
  }
  const { message, history } = data;
  try {
    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 4000
    ) {
      return NextResponse.json(
        { error: "Please enter a message of up to 4,000 characters" },
        { status: 400 },
      );
    }

    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      // Last 6 messages for conversation context
      ...(Array.isArray(history) ? history : [])
        .filter(
          (m): m is { role: "user" | "assistant"; content: string } =>
            m &&
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string",
        )
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) })),
      { role: "user", content: message },
    ];

    const model = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
    const completion = await getClient().chat.completions.create({
      model,
      ...(model.startsWith("openai/gpt-oss")
        ? { reasoning_effort: "low" as const }
        : {}),
      messages,
      max_completion_tokens: 1024,
      temperature: 0.5,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply)
      return NextResponse.json(
        { error: "No answer was returned. Please try again." },
        { status: 502 },
      );
    return NextResponse.json({ reply });
  } catch (err: unknown) {
    const errObj = err as { code?: string; status?: number; message?: string };
    console.error("[chat] Request failed:", {
      code: errObj.code,
      status: errObj.status,
    });
    if (errObj?.status === 429) {
      return NextResponse.json(
        { error: "Rate limit reached. Please wait a moment and try again." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { error: "Failed to process query" },
      { status: 500 },
    );
  }
}

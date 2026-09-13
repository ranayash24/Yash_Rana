import { NextRequest, NextResponse } from "next/server";
import {
  emailEndpoint,
  emailDeliveryConfigured,
  emailPayload,
  type ContactMessage,
} from "@/lib/contact";

export async function POST(req: NextRequest) {
  let form: ContactMessage;
  try {
    const data = await req.json();
    const limits = { name: 120, email: 254, subject: 200, message: 10000 };
    if (
      !data ||
      typeof data !== "object" ||
      Object.entries(limits).some(
        ([key, limit]) =>
          (key !== "subject" || data[key] !== undefined) &&
          (typeof data[key] !== "string" || data[key].length > limit),
      )
    ) {
      return NextResponse.json(
        { error: "Invalid contact details" },
        { status: 400 },
      );
    }
    form = {
      name: data.name.trim(),
      email: data.email.trim(),
      subject: (data.subject || "").trim(),
      message: data.message.trim(),
    };
    if (
      !form.name ||
      !form.message ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
      data["bot-field"]
    ) {
      return NextResponse.json(
        { error: "Name, valid email and message are required" },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Invalid contact details" },
      { status: 400 },
    );
  }

  if (!emailDeliveryConfigured) {
    return NextResponse.json(
      {
        error:
          "Automatic email delivery is not configured. Please email yashrana2402@gmail.com directly.",
      },
      { status: 503 },
    );
  }

  try {
    // This preserved API requires EmailJS Account > Security to allow server requests.
    // The active contact page uses the supported browser integration instead.
    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...emailPayload(form),
        ...(process.env.EMAILJS_PRIVATE_KEY
          ? { accessToken: process.env.EMAILJS_PRIVATE_KEY }
          : {}),
      }),
      signal: AbortSignal.timeout(20000),
    });
    const confirmation = await response.text();
    if (response.status === 200 && confirmation.trim() === "OK") {
      return NextResponse.json({ success: true });
    }
    console.error(
      "[contact] EmailJS did not confirm sending:",
      response.status,
    );
    return NextResponse.json(
      { error: "The email service did not confirm sending" },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the email service" },
      { status: 502 },
    );
  }
}

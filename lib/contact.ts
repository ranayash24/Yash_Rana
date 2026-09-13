export const contactEmail = "yashrana2402@gmail.com";
export const emailDeliveryConfigured = Boolean(
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID !== "template_0w2rpis",
);
export const emailEndpoint = "https://api.emailjs.com/api/v1.0/email/send";

export type ContactMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// These are the existing EmailJS public identifiers, not private credentials.
export function emailPayload(form: ContactMessage) {
  return {
    service_id: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_dtcqrgj",
    template_id:
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_0w2rpis",
    user_id: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "xYpjewyPcaRv9w4yO",
    template_params: {
      to_email: contactEmail,
      to_name: "Yash Rana",
      from_name: form.name.trim(),
      from_email: form.email.trim(),
      reply_to: form.email.trim(),
      // Support both the original form field names and the email template names.
      name: form.name.trim(),
      email: form.email.trim(),
      subject:
        form.subject.trim() || `Portfolio contact from ${form.name.trim()}`,
      message: form.message.trim(),
    },
  };
}

export async function sendContactEmail(form: ContactMessage) {
  if (!emailDeliveryConfigured)
    throw new Error("Automatic email delivery is not configured.");
  // EmailJS supports browser requests by default; server requests need a separate
  // account setting. Send directly from the browser, like the original website.
  const response = await fetch(emailEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailPayload(form)),
    signal: AbortSignal.timeout(20000),
  });
  const confirmation = await response.text();
  // A generic 2xx HTML response must never be mistaken for email acceptance.
  if (response.status !== 200 || confirmation.trim() !== "OK") {
    throw new Error("The email service did not confirm sending.");
  }
}

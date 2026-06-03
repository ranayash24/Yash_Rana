import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email and message are required' }, { status: 400 })
    }

    const payload = {
      service_id: 'service_dtcqrgj',
      template_id: 'template_0w2rpis',
      user_id: 'xYpjewyPcaRv9w4yO',
      template_params: {
        to_email: 'yashrana240203@gmail.com',
        to_name: 'Yash Rana',
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: subject || `Portfolio contact from ${name}`,
        message,
      },
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      return NextResponse.json({ success: true })
    }

    const errText = await response.text()
    console.error('[contact] EmailJS error:', errText)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  } catch (err) {
    console.error('[contact] Error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

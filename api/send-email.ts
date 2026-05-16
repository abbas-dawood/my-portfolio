import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn("GMAIL_USER or GMAIL_APP_PASSWORD is not configured in Vercel Environment Variables");
      return res.status(500).json({ error: 'Email configuration missing on server' });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const phoneText = phone ? `\nPhone: ${phone}` : '';

    // 1. Send notification to Abbas
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      replyTo: email,
      to: "abbassaifee43@gmail.com",
      subject: `New UI Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}${phoneText}\n\nMessage:\n${message}`,
    });

    // 2. Send auto-reply to the visitor
    await transporter.sendMail({
      from: `"Abbas Dawood" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nI have received your message and will get back to you soon!\n\nBest,\nAbbas Dawood`,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}

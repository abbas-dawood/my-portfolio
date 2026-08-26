import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, message, hidden } = req.body;

    if (hidden) {
      return res.status(400).json({ success: false, message: 'Invalid request.' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
       return res.status(400).json({ success: false, message: 'Input exceeds maximum length.' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
    const SMTP_SECURE = process.env.SMTP_SECURE === "true" || SMTP_PORT === 465;
    const SMTP_USER = process.env.SMTP_USER || process.env.GMAIL_USER;
    const SMTP_PASS = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "abbassaifee43@gmail.com";
    const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || SMTP_USER;
    const CONTACT_FROM_NAME = process.env.CONTACT_FROM_NAME || "Abbas Dawood";

    if (!SMTP_USER || !SMTP_PASS) {
      console.warn("SMTP credentials missing on server");
      return res.status(500).json({ success: false, message: 'Email configuration missing on server' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const escapeHtml = (unsafe: string) => {
      return unsafe
           .replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;")
           .replace(/"/g, "&quot;")
           .replace(/'/g, "&#039;");
    };

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');
    const transmissionId = `AD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    const ownerHtml = `
      <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
        <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">NEW INCOMING TRANSMISSION</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p><strong style="color: #64748b;">VISITOR:</strong><br/>${safeName}</p>
          <p><strong style="color: #64748b;">RETURN CHANNEL:</strong><br/><a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></p>
          <p><strong style="color: #64748b;">TRANSMISSION ID:</strong><br/><span style="color: #f59e0b;">${transmissionId}</span></p>
          <p><strong style="color: #64748b;">TIMESTAMP:</strong><br/>${new Date().toUTCString()}</p>
          <p><strong style="color: #64748b;">SOURCE:</strong><br/>Abbas Dawood Portfolio</p>
          
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          <p><strong style="color: #64748b;">MESSAGE:</strong></p>
          <div style="background-color: #0f172a; padding: 20px; border-left: 4px solid #06b6d4; color: #f8fafc; font-family: sans-serif;">
            ${safeMessage}
          </div>
        </div>
      </div>
    `;

    const visitorHtml = `
      <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
        <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">TRANSMISSION RECEIVED</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p style="font-family: sans-serif; font-size: 16px;">Hello ${safeName},</p>
          <p style="font-family: sans-serif; font-size: 16px;">Your transmission has successfully reached Abbas.</p>
          
          <div style="background-color: #0f172a; padding: 15px; margin: 20px 0; border-left: 2px solid #38bdf8;">
            <p style="margin: 0; font-size: 12px; color: #64748b; margin-bottom: 8px;">MESSAGE RECEIVED:</p>
            <p style="margin: 0; font-family: sans-serif;">${safeMessage}</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">TRANSMISSION ID:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #f59e0b;">${transmissionId}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">STATUS:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #10b981;">RECEIVED</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">EXPECTED RESPONSE:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #cbd5e1; font-family: sans-serif;">I’ll review your message and get back to you as soon as possible.</td>
            </tr>
          </table>
          
          <p style="margin-top: 40px; color: #64748b; font-size: 14px;">
            Signed,<br/>
            <strong style="color: #f8fafc; font-size: 16px;">Abbas Dawood</strong><br/>
            Aviation &bull; Digital Identity
          </p>
        </div>
      </div>
    `;

    // 1. Send notification to Abbas
    await transporter.sendMail({
      from: `"${safeName}" <${CONTACT_FROM_EMAIL}>`,
      replyTo: email,
      to: CONTACT_TO_EMAIL,
      subject: `New Transmission from ${name}`,
      text: `NEW INCOMING TRANSMISSION\n\nVisitor: ${name}\nReturn Channel: ${email}\nTransmission ID: ${transmissionId}\nMessage: ${message}`,
      html: ownerHtml,
    });

    // 2. Send auto-reply to the visitor
    await transporter.sendMail({
      from: `"${CONTACT_FROM_NAME}" <${CONTACT_FROM_EMAIL}>`,
      to: email,
      subject: "Transmission Received — Abbas Dawood",
      text: `Hello ${name},\n\nYour transmission has successfully reached Abbas.\n\nMessage received:\n${message}\n\nTransmission ID: ${transmissionId}\nStatus: RECEIVED\n\nI’ll review your message and get back to you as soon as possible.\n\nSigned,\nAbbas Dawood\nAviation • Digital Identity`,
      html: visitorHtml,
    });

    return res.status(200).json({ success: true, transmissionId });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ success: false, message: "Unable to process transmission." });
  }
}

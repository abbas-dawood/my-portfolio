import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

let db: any = null;
try {
  const firebaseConfigPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(firebaseConfigPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, 'utf-8'));
    const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
  }
} catch (e) {
  console.warn('Firestore initialization warning in serverless handler:', e);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, purpose, message, hidden } = req.body;

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

    const transmissionId = `AD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const cleanPurpose = (purpose || 'General Inquiry').trim();

    // 1. Save to Firestore
    let savedToFirestore = false;
    if (db) {
      try {
        await setDoc(doc(db, 'contacts', transmissionId), {
          name: name.trim(),
          email: email.trim(),
          subject: cleanPurpose,
          purpose: cleanPurpose,
          body: message.trim(),
          transmissionId,
          read: false,
          createdAt: serverTimestamp()
        });
        savedToFirestore = true;
      } catch (dbErr) {
        console.warn('Firestore write warning:', dbErr);
      }
    }

    const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
    const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
    const SMTP_SECURE = process.env.SMTP_SECURE === "true" || SMTP_PORT === 465;
    const SMTP_USER = process.env.SMTP_USERNAME || process.env.SMTP_USER || process.env.GMAIL_USER;
    const SMTP_PASS = process.env.SMTP_PASSWORD || process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const CONTACT_TO_EMAIL = process.env.OWNER_EMAIL || process.env.CONTACT_TO_EMAIL || "abbassaifee43@gmail.com";
    const CONTACT_FROM_EMAIL = process.env.SENDER_EMAIL || process.env.CONTACT_FROM_EMAIL || SMTP_USER || "contact.abbasdawood@gmail.com";
    const CONTACT_FROM_NAME = process.env.SENDER_NAME || process.env.CONTACT_FROM_NAME || "Abbas Dawood";

    if (SMTP_USER && SMTP_PASS) {
      try {
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

        const ownerHtml = `
          <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
            <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
              <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">NEW INCOMING TRANSMISSION</h2>
              <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
              
              <p><strong style="color: #64748b;">VISITOR:</strong><br/>${safeName}</p>
              <p><strong style="color: #64748b;">RETURN CHANNEL:</strong><br/><a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></p>
              <p><strong style="color: #64748b;">PURPOSE:</strong><br/>${cleanPurpose}</p>
              <p><strong style="color: #64748b;">TRANSMISSION ID:</strong><br/><span style="color: #f59e0b;">${transmissionId}</span></p>
              <p><strong style="color: #64748b;">TIMESTAMP:</strong><br/>${new Date().toUTCString()}</p>
              
              <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
              <p><strong style="color: #64748b;">MESSAGE:</strong></p>
              <div style="background-color: #0f172a; padding: 20px; border-left: 4px solid #06b6d4; color: #f8fafc; font-family: sans-serif;">
                ${safeMessage}
              </div>
            </div>
          </div>
        `;

        let visitorBodyText = "Your transmission has successfully reached Abbas.<br/><br/>I'll review your inquiry and get back to you as soon as possible.";
        
        if (process.env.GEMINI_API_KEY) {
          try {
            const ai = new GoogleGenAI({
              apiKey: process.env.GEMINI_API_KEY,
              httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
            });
            
            const prompt = `You are an AI assistant helping to draft an auto-reply for Abbas Dawood. 
A visitor named "${safeName}" submitted an inquiry via the portfolio contact form. 
Purpose: ${cleanPurpose}
Message: ${safeMessage}

Generate a short, warm, and professional confirmation email body acknowledging their specific purpose and message. Mention that Abbas has received the message and will get back to them soon.
Keep it under 3-4 sentences. Do NOT include greetings (like "Hi Name") or sign-offs (like "Best regards") - just generate the core message paragraph. Do not use placeholders.`;

            const response = await ai.models.generateContent({
              model: "gemini-3.8-flash",
              contents: prompt,
            });
            
            if (response.text) {
              visitorBodyText = response.text.trim().replace(/\n/g, '<br/>');
            }
          } catch (e) {
            console.error("Gemini text generation failed, falling back to static text.", e);
          }
        }

        const visitorHtml = `
          <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
            <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
              <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">TRANSMISSION RECEIVED</h2>
              <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
              
              <p style="font-family: sans-serif; font-size: 16px;">Hello ${safeName},</p>
              <p style="font-family: sans-serif; font-size: 16px;">${visitorBodyText}</p>
              
              <div style="background-color: #0f172a; padding: 15px; margin: 20px 0; border-left: 2px solid #38bdf8;">
                <p style="margin: 0; font-size: 12px; color: #64748b; margin-bottom: 8px;">MESSAGE RECEIVED:</p>
                <p style="margin: 0; font-family: sans-serif;">${safeMessage}</p>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">TRANSMISSION ID:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #f59e0b;">${transmissionId}</td>
                </tr>
              </table>
              
              <p style="margin-top: 40px; color: #64748b; font-size: 14px;">
                Best regards,<br/><br/>
                <strong style="color: #f8fafc; font-size: 16px;">Abbas Dawood</strong><br/>
                ${CONTACT_FROM_EMAIL}
              </p>
            </div>
          </div>
        `;

        // Send email to Abbas
        await transporter.sendMail({
          from: `"${safeName}" <${CONTACT_FROM_EMAIL}>`,
          replyTo: email,
          to: CONTACT_TO_EMAIL,
          subject: `[Portfolio Inquiry] ${cleanPurpose} - from ${name}`,
          html: ownerHtml,
        }).catch(e => console.warn('Transporter owner mail error:', e));

        // Auto-reply to visitor
        await transporter.sendMail({
          from: `"${CONTACT_FROM_NAME}" <${CONTACT_FROM_EMAIL}>`,
          to: email,
          subject: "Transmission Received — Abbas Dawood",
          html: visitorHtml,
        }).catch(e => console.warn('Transporter visitor mail error:', e));

      } catch (mailErr) {
        console.warn('Mail dispatch warning:', mailErr);
      }
    }

    return res.status(200).json({ success: true, transmissionId });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({ success: false, message: "Unable to process transmission." });
  }
}

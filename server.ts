import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";
import dotenv from "dotenv";
import { spawn } from "child_process";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Initialize Firestore on the server
let db: any = null;
try {
  const firebaseConfigPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(firebaseConfigPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(firebaseConfigPath, "utf-8"));
    const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log("[Server] Firestore connection established successfully");
  }
} catch (e) {
  console.error("[Server] Firestore initialization warning:", e);
}

const OWNER_EMAIL = process.env.OWNER_EMAIL || 'abbassaifee43@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'contact.abbasdawood@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Abbas Dawood';
const OWNER_PHONE = process.env.OWNER_PHONE || '+91 90243 28122';

function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, purpose, message, hidden } = req.body;

    if (hidden) {
      return res.status(400).json({ success: false, message: "Invalid request." });
    }

    if (!name || !email || !message || !purpose) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
       return res.status(400).json({ success: false, message: "Input exceeds maximum length." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
       return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePurpose = escapeHtml(purpose);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const transmissionId = `AD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    const ownerHtml = `
      <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
        <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">NEW PORTFOLIO INQUIRY</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p><strong style="color: #64748b;">VISITOR:</strong><br/>${safeName}</p>
          <p><strong style="color: #64748b;">RETURN CHANNEL:</strong><br/><a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></p>
          <p><strong style="color: #64748b;">PURPOSE:</strong><br/>${safePurpose}</p>
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

    let visitorBodyText = "Thanks for reaching out through my portfolio.<br/><br/>Your message has been successfully received.<br/>I will review your inquiry and respond through the email address you provided.";
    
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });
        
        const prompt = `You are an AI assistant helping to draft an auto-reply for Abbas Dawood. 
A visitor named "${safeName}" submitted an inquiry via the portfolio contact form. 
Purpose: ${safePurpose}
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
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">ABBAS DAWOOD &bull; COMMUNICATION CHANNEL</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p style="font-family: sans-serif; font-size: 16px;">Hi ${safeName},</p>
          <p style="font-family: sans-serif; font-size: 16px;">${visitorBodyText}</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">TRANSMISSION ID:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #f59e0b;">${transmissionId}</td>
            </tr>
          </table>
          
          <p style="margin-top: 40px; color: #64748b; font-size: 14px;">
            Best regards,<br/><br/>
            <strong style="color: #f8fafc; font-size: 16px;">Abbas Dawood</strong><br/>
            ${SENDER_EMAIL}<br/>
            ${OWNER_PHONE}
          </p>
        </div>
      </div>
    `;

    const emailPayload = {
      owner_email: OWNER_EMAIL,
      visitor_email: email,
      sender_email: SENDER_EMAIL,
      sender_name: SENDER_NAME,
      owner_subject: `[Portfolio Contact] ${purpose}`,
      visitor_subject: `Received — Your message to Abbas Dawood`,
      owner_html: ownerHtml,
      visitor_html: visitorHtml
    };

    let savedToFirestore = false;
    if (db) {
      try {
        await setDoc(doc(db, "contacts", transmissionId), {
          name: name.trim(),
          email: email.trim(),
          subject: purpose.trim(),
          purpose: purpose.trim(),
          body: message.trim(),
          transmissionId,
          read: false,
          createdAt: serverTimestamp()
        });
        savedToFirestore = true;
        console.log(`[Contact] Transmission ${transmissionId} successfully recorded in Firestore.`);
      } catch (dbErr) {
        console.error("[Contact] Database write error:", dbErr);
      }
    }

    // Execute Python script to dispatch emails via SMTP
    try {
      const pythonProcess = spawn("python3", ["send_email.py"]);

      let outputData = "";
      let errorData = "";

      pythonProcess.stdout.on("data", (data) => {
        outputData += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        errorData += data.toString();
      });

      pythonProcess.on("close", (code) => {
        try {
          const result = JSON.parse(outputData.trim());
          if (result.success) {
            console.log(`[Contact] SMTP dispatched successfully for ${transmissionId}`);
          } else {
            console.warn(`[Contact] SMTP notice for ${transmissionId}:`, result.error, errorData);
          }
        } catch (e) {
          console.warn("[Contact] SMTP script output notice:", outputData, errorData);
        }
      });

      pythonProcess.stdin.write(JSON.stringify(emailPayload));
      pythonProcess.stdin.end();
    } catch (spawnErr) {
      console.warn("[Contact] Could not spawn email process:", spawnErr);
    }

    // Return success to the visitor with their transmission ID
    res.status(200).json({ 
      success: true, 
      transmissionId,
      message: "Transmission received and logged successfully."
    });

  } catch (error) {
    console.error("Transmission error:", error);
    res.status(500).json({ success: false, message: "Transmission failed. Please try again." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

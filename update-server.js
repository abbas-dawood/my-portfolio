import fs from 'fs';

const serverCode = `import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import crypto from "crypto";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'your-real-email@example.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'contact@yourdomain.com';
const SENDER_NAME = process.env.SENDER_NAME || 'Abbas Dawood';
const OWNER_PHONE = process.env.OWNER_PHONE || '+91 XXXXXXXXXX';

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

    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
       return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePurpose = escapeHtml(purpose);
    const safeMessage = escapeHtml(message).replace(/\\n/g, '<br/>');

    const transmissionId = \`AD-\${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-\${crypto.randomBytes(3).toString('hex').toUpperCase()}\`;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Returning mock success.");
      return res.status(200).json({ success: true, transmissionId });
    }

    const ownerHtml = \`
      <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
        <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">NEW PORTFOLIO INQUIRY</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p><strong style="color: #64748b;">VISITOR:</strong><br/>\${safeName}</p>
          <p><strong style="color: #64748b;">RETURN CHANNEL:</strong><br/><a href="mailto:\${safeEmail}" style="color: #38bdf8;">\${safeEmail}</a></p>
          <p><strong style="color: #64748b;">PURPOSE:</strong><br/>\${safePurpose}</p>
          <p><strong style="color: #64748b;">TRANSMISSION ID:</strong><br/><span style="color: #f59e0b;">\${transmissionId}</span></p>
          <p><strong style="color: #64748b;">TIMESTAMP:</strong><br/>\${new Date().toUTCString()}</p>
          
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          <p><strong style="color: #64748b;">MESSAGE:</strong></p>
          <div style="background-color: #0f172a; padding: 20px; border-left: 4px solid #06b6d4; color: #f8fafc; font-family: sans-serif;">
            \${safeMessage}
          </div>
        </div>
      </div>
    \`;

    // Personalized auto-reply text
    let personalizedLine = "Thanks for reaching out through my portfolio.";
    if (purpose === "Collaboration") personalizedLine = "Thanks for reaching out regarding a potential collaboration.";
    else if (purpose === "Business Inquiry") personalizedLine = "Thanks for getting in touch regarding a business inquiry.";
    else if (purpose === "MUN / Diplomacy") personalizedLine = "Thanks for reaching out regarding MUN and diplomacy.";
    else if (purpose === "Speaking / Event") personalizedLine = "Thanks for your interest in connecting regarding a speaking or event opportunity.";
    else if (purpose === "Technical Inquiry") personalizedLine = "Thanks for reaching out regarding your technical inquiry.";
    else if (purpose === "Project Inquiry") personalizedLine = "Thanks for your interest regarding a project inquiry.";
    else if (purpose === "Internship / Opportunity") personalizedLine = "Thanks for getting in touch regarding an opportunity.";

    const visitorHtml = \`
      <div style="background-color: #020617; color: #cbd5e1; font-family: 'Courier New', Courier, monospace; padding: 40px;">
        <div style="max-w-2xl mx-auto border: 1px solid #06b6d4; padding: 30px;">
          <h2 style="color: #06b6d4; letter-spacing: 2px; margin-top: 0; text-transform: uppercase;">ABBAS DAWOOD &bull; COMMUNICATION CHANNEL</h2>
          <hr style="border: 0; border-bottom: 1px solid #0f172a; margin: 20px 0;" />
          
          <p style="font-family: sans-serif; font-size: 16px;">Hi \${safeName},</p>
          <p style="font-family: sans-serif; font-size: 16px;">\${personalizedLine}</p>
          <p style="font-family: sans-serif; font-size: 16px;">I've received your message regarding: <strong>"\${safePurpose}"</strong></p>
          <p style="font-family: sans-serif; font-size: 16px;">Your message has been successfully received and added to my communication channel. I will review your message and get back to you through the email address you provided.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 30px;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #64748b;">REFERENCE ID:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #0f172a; color: #f59e0b;">\${transmissionId}</td>
            </tr>
          </table>
          
          <p style="margin-top: 40px; color: #64748b; font-size: 14px;">
            Best regards,<br/><br/>
            <strong style="color: #f8fafc; font-size: 16px;">Abbas Dawood</strong><br/>
            \${SENDER_EMAIL}<br/>
            \${OWNER_PHONE}
          </p>
        </div>
      </div>
    \`;

    // 1. Send notification to owner
    const ownerEmailRes = await resend.emails.send({
      from: \`\${SENDER_NAME} <\${SENDER_EMAIL}>\`,
      to: [OWNER_EMAIL],
      subject: \`[Portfolio Contact] New Inquiry — \${purpose}\`,
      html: ownerHtml,
      replyTo: email
    });

    if (ownerEmailRes.error) {
      console.error("Owner email failed:", ownerEmailRes.error);
      return res.status(500).json({ success: false, message: "Transmission failed. Please try again." });
    }

    // 2. Send visitor confirmation
    const visitorEmailRes = await resend.emails.send({
      from: \`\${SENDER_NAME} <\${SENDER_EMAIL}>\`,
      to: [email],
      subject: \`Received — Your message to Abbas Dawood\`,
      html: visitorHtml,
      replyTo: OWNER_EMAIL
    });

    if (visitorEmailRes.error) {
      console.error("Visitor email failed:", visitorEmailRes.error);
      // Even if visitor email fails, owner received it, but let's be strict as requested.
      return res.status(500).json({ success: false, message: "We were unable to complete the transmission. Please try again." });
    }

    res.status(200).json({ success: true, transmissionId });

  } catch (error) {
    console.error("Email send error:", error);
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
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
`;

fs.writeFileSync('server.ts', serverCode);

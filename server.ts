import express from "express";
import path from "path";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Setup nodemailer transporter
let transporter: nodemailer.Transporter | null = null;
if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

// API route for sending emails
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!transporter) {
      console.warn("GMAIL_USER or GMAIL_APP_PASSWORD is not configured. Emulating email send...");
      return res.status(200).json({ success: true, emulated: true });
    }

    // 1. Send notification to Abbas (The owner)
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`, // Sent from your authenticated Gmail
      replyTo: email, // If you click reply, it will reply to the visitor's email
      to: "abbassaifee43@gmail.com",
      subject: `New UI Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    // 2. Send auto-reply to the visitor
    await transporter.sendMail({
      from: `"Abbas Dawood" <${process.env.GMAIL_USER}>`, // Sent from your authenticated Gmail
      to: email, // Sending to visitor's email without restrictions
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nI have received your message and will get back to you soon!\n\nBest,\nAbbas Dawood`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ error: "Failed to send email" });
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

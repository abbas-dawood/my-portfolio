import fs from 'fs';
let code = fs.readFileSync('server.ts', 'utf8');

const targetMock = `    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured. Returning mock success.");
      return res.status(200).json({ success: true, transmissionId });
    }`;

const replacementMock = `    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy') {
      console.error("CRITICAL: RESEND_API_KEY is not configured in the environment.");
      return res.status(500).json({ success: false, message: "Server misconfiguration. Transmission failed." });
    }`;

code = code.replace(targetMock, replacementMock);
fs.writeFileSync('server.ts', code);

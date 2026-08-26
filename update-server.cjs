const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

code = code.replace(
  'import dotenv from "dotenv";',
  'import dotenv from "dotenv";\nimport fs from "fs";'
);

code = code.replace(
  /\/\/ 1\. Send notification to Abbas[\s\S]*?res\.status\(200\)\.json\(\{ success: true, transmissionId \}\);\n  \} catch \(error\) \{/m,
`    // 1. Send notification to Abbas
    try {
      await transporter.sendMail({
        from: \`"\${safeName}" <\${CONTACT_FROM_EMAIL}>\`,
        replyTo: email,
        to: CONTACT_TO_EMAIL,
        subject: \`New Transmission from \${name}\`,
        text: \`NEW INCOMING TRANSMISSION\\n\\nVisitor: \${name}\\nReturn Channel: \${email}\\nTransmission ID: \${transmissionId}\\nMessage: \${message}\`,
        html: ownerHtml,
      });

      // 2. Send auto-reply to the visitor
      await transporter.sendMail({
        from: \`"\${CONTACT_FROM_NAME}" <\${CONTACT_FROM_EMAIL}>\`,
        to: email,
        subject: "Transmission Received — Abbas Dawood",
        text: \`Hello \${name},\\n\\nYour transmission has successfully reached Abbas.\\n\\nMessage received:\\n\${message}\\n\\nTransmission ID: \${transmissionId}\\nStatus: RECEIVED\\n\\nI’ll review your message and get back to you as soon as possible.\\n\\nSigned,\\nAbbas Dawood\\nAviation • Digital Identity\`,
        html: visitorHtml,
      });
    } catch (emailError) {
      console.error("SMTP delivery failed, saving transmission to local logs:", emailError);
      const logEntry = \`\\n--- NEW TRANSMISSION [\${new Date().toISOString()}] ---\\nID: \${transmissionId}\\nFROM: \${name} <\${email}>\\nMESSAGE:\\n\${message}\\n---------------------------------------\\n\`;
      try {
        fs.appendFileSync(path.join(process.cwd(), 'transmissions.log'), logEntry);
      } catch (fsErr) {
        console.error("Failed to write to log:", fsErr);
      }
    }

    res.status(200).json({ success: true, transmissionId });
  } catch (error) {`
);

fs.writeFileSync('server.ts', code);

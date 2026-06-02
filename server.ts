import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON middleware
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Email API route
  app.post("/api/send-email", async (req, res) => {
    const { name, email, services, project } = req.body;

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      return res.status(500).json({ error: "SMTP credentials are not configured on the server." });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // Can be adjusted depending on the provider
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpEmail}>`, // sender address
        to: "edarts.blida@gmail.com", // receiver address
        replyTo: email,
        subject: `Nouveau message de contact : ${name}`, // Subject line
        text: `Nom: ${name}\nEmail: ${email}\nServices: ${services.join(', ')}\nProjet:\n${project}`,
        html: `
          <h2>Nouveau message depuis le formulaire de contact</h2>
          <p><strong>Nom / Entreprise :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Services souhaités :</strong> ${services.length > 0 ? services.join(', ') : 'Aucun'}</p>
          <p><strong>Description du projet :</strong></p>
          <p>${project.replace(/\n/g, '<br/>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // For Express 4.x, app.get('*', ...). It is Express 4.21.2 based on package.json.
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

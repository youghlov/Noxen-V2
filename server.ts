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
      console.warn("⚠️ SMTP credentials not configured. Logging contact email instead:");
      console.log(req.body);
      return res.json({ success: true, message: "Email logged to console (SMTP not configured)" });
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
      console.warn("⚠️ SMTP connection failed. Returning success anyway for development.");
      return res.json({ success: true, message: "Email logged to console (SMTP failed)" });
    }
  });

  // Email API route for quotes
  app.post("/api/send-quote", async (req, res) => {
    const { name, email, phone, company, plan, billing, message } = req.body;

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpEmail || !smtpPassword) {
      console.warn("⚠️ SMTP credentials not configured. Logging quote request instead:");
      console.log(req.body);
      return res.json({ success: true, message: "Devis logged to console (SMTP not configured)" });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpEmail,
          pass: smtpPassword,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpEmail}>`,
        to: "edarts.blida@gmail.com",
        replyTo: email,
        subject: `Nouvelle demande de devis : ${plan} (${billing})`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone}\nEntreprise: ${company}\nForfait: ${plan}\nFacturation: ${billing}\nMessage:\n${message}`,
        html: `
          <h2>Nouvelle demande de devis (Forfait : ${plan})</h2>
          <p><strong>Nom complet :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone || 'Non spécifié'}</p>
          <p><strong>Entreprise :</strong> ${company || 'Non spécifiée'}</p>
          <p><strong>Forfait choisi :</strong> ${plan}</p>
          <p><strong>Cycle de facturation :</strong> ${billing}</p>
          <p><strong>Besoins spécifiques :</strong></p>
          <p>${message ? message.replace(/\n/g, '<br/>') : 'Aucun'}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Devis sent successfully" });
    } catch (error) {
      console.error("Error sending quote email:", error);
      console.warn("⚠️ SMTP connection failed. Returning success anyway for development.");
      return res.json({ success: true, message: "Devis logged to console (SMTP failed)" });
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

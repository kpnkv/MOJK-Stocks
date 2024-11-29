import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// form submission route
router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send({ message: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,   
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: process.env.EMAIL_USER, 
      subject: `Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,

      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({ message: "Your message has been sent successfully." });
  } catch (error) {
    console.error("Error sending email:", error);;
    return res.status(500).send({ message: "Failed to send email. Please try again later." });
  }
});

router.post("/newsletter", async (req, res) => {
  const { email } = req.body;

  if (!email) {
      return res.status(400).send({ message: "Email is required." });
  }

  try {
      const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  // Send confirmation to subscriber
  const subscriberMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome to MOJK Stocks Newsletter!",
      text: `
      Thank you for subscribing to MOJK Stocks Newsletter!
      
      You'll now receive regular updates about:
      - Market trends and analysis
      - Top performing stocks
      - Investment tips and strategies
      - Important market news
      
      If you wish to unsubscribe, please click here: [Unsubscribe Link]
      
      Best regards,
      MOJK Stocks Team
      `
  };

  // Send notification to admin
  const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "New Newsletter Subscription",
      text: `New newsletter subscription from: ${email}`
  };

  await transporter.sendMail(subscriberMailOptions);
  await transporter.sendMail(adminMailOptions);

  return res.status(200).send({
      message: "Successfully subscribed to newsletter. Please check your email for confirmation." 
  });
  } catch (error) {
  console.error("Error sending email:", error);
  return res.status(500).send({
      message: "Failed to process subscription. Please try again later."
  });
  }
});

export default router;
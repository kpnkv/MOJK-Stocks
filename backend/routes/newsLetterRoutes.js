import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
dotenv.config();

const router = express.Router();

// Newsletter subscription route
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
import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Sending the email to yourself
            replyTo: email, // Set reply-to as the sender's email
            subject: `New Contact Form: ${subject}`,
            text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
      `,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    }
}
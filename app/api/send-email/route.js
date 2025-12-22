import nodemailer from 'nodemailer';
import { generateEmailTemplate } from '@/lib/email-template';

export async function POST(req) {
    const { email, subject, name, message } = await req.json();

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        const htmlContent = generateEmailTemplate({ name, email, subject, message });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Portfolio: User Contact Query ${subject}`,
            html: htmlContent,
        });

        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

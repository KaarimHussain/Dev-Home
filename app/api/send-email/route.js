import nodemailer from 'nodemailer';

export async function POST(req) {
    const { email, phone, name, message } = await req.json();

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
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Portfolio: User Contact Query",
            text: `Name: ${name}\nPhone: ${phone}\nMessage: ${message}`,
        });

        return Response.json({ success: true });
    } catch (err) {
        return Response.json({ success: false, error: err.message }, { status: 500 });
    }
}

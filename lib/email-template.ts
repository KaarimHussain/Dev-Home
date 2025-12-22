interface EmailTemplateProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const generateEmailTemplate = ({ name, email, subject, message }: EmailTemplateProps) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Reaching Out</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap');
            body { font-family: 'Fira Mono', monospace; background-color: #f8f9fa; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
            .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
            .header { background-color: #0a0a0a; padding: 40px 30px; text-align: center; }
            .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
            .header span { color: #615fff; }
            .content { padding: 40px; color: #333333; line-height: 1.6; }
            .greeting { font-size: 18px; font-weight: 700; color: #0a0a0a; margin-bottom: 16px; }
            .intro-text { color: #475569; margin-bottom: 30px; font-size: 15px; }
            .summary-card { background-color: #f8f9fa; border-radius: 8px; padding: 24px; border: 1px solid #e2e8f0; margin-bottom: 30px; }
            .field { margin-bottom: 20px; }
            .field:last-child { margin-bottom: 0; }
            .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #615fff; margin-bottom: 4px; letter-spacing: 1px; }
            .value { font-size: 14px; color: #0a0a0a; font-weight: 500; }
            .message-preview { margin-top: 12px; padding-top: 12px; border-top: 1px dashed #cbd5e1; font-style: italic; color: #64748b; }
            .next-steps { border-left: 3px solid #615fff; padding-left: 20px; margin: 30px 0; }
            .footer { background-color: #ffffff; padding: 30px; text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; }
            .cta-sub { color: #615fff; font-weight: 700; text-decoration: none; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Kaarim <span>Hussain</span></h1>
            </div>
            <div class="content">
                <div class="greeting">Hello ${name},</div>
                <p class="intro-text">
                    Thank you for reaching out! I've received your message regarding <strong>"${subject}"</strong>. 
                    I appreciate you taking the time to connect with me through my portfolio.
                </p>

                <div class="next-steps">
                    <div class="label" style="color: #0a0a0a;">What's Next?</div>
                    <div class="value">
                        I am currently reviewing your inquiry and will get back to you personally at <strong>${email}</strong> within the next 24-48 business hours.
                    </div>
                </div>
                
                <div class="summary-card">
                    <div class="label">Submission Summary</div>
                    <div class="field">
                        <div class="value" style="white-space: pre-wrap;">${message}</div>
                    </div>
                </div>

                <p class="intro-text" style="margin-bottom: 0;">
                    Best regards,<br>
                    <strong>Kaarim Hussain</strong>
                </p>
            </div>
            <div class="footer">
                <p>This is an automated confirmation of your inquiry.</p>
                <p>&copy; ${new Date().getFullYear()} Kaarim Hussain. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
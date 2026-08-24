import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_SERVER,
  port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

const defaultFrom = `"${process.env.BREVO_FROM_NAME}" <${process.env.BREVO_FROM_EMAIL}>`;

// Common CSS styles for emails
const EMAIL_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    background-color: #f8fafc;
    margin: 0;
    padding: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    background-color: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    border: 1px solid #f1f5f9;
  }
  .header {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
    padding: 40px 20px;
    text-align: center;
    color: white;
  }
  .header h1 {
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    letter-spacing: -0.5px;
  }
  .content {
    padding: 40px;
    color: #334155;
    line-height: 1.6;
    font-size: 16px;
  }
  .button {
    display: inline-block;
    background-color: #2563eb;
    color: #ffffff !important;
    text-decoration: none;
    padding: 14px 28px;
    border-radius: 8px;
    font-weight: 600;
    margin: 24px 0;
    text-align: center;
  }
  .footer {
    background-color: #f8fafc;
    padding: 30px 40px;
    text-align: center;
    border-top: 1px solid #f1f5f9;
  }
  .footer p {
    margin: 0;
    font-size: 13px;
    color: #64748b;
    line-height: 1.5;
  }
  .security-notice {
    margin-top: 20px;
    padding: 16px;
    background-color: #fff1f2;
    border-radius: 8px;
    border: 1px solid #ffe4e6;
    font-size: 13px;
    color: #9f1239;
    text-align: left;
  }
`;

export const sendWelcomeEmail = async (to: string, name: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Whizpoint Flipbook! 📚</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>We're thrilled to have you on board! Whizpoint Flipbook is the ultimate platform for transforming your A3 booklet print-spreads into highly interactive digital flipbooks.</p>
          <p>You can now start uploading your PDFs and generating beautiful, shareable links instantly.</p>
          <center>
            <a href="https://flipdoc.whizpoint.app/auth/login" class="button">Go to Dashboard</a>
          </center>
          <p>If you need any help, just reply to this email.</p>
          <p>Happy publishing,<br>The Whizpoint Flipbook Team</p>
          
          <div class="security-notice">
            <strong>Security Notice:</strong> This email was sent to ${to} because an account was created on Whizpoint Flipbook. If this was a mistake, or you did not request this, please ignore it or report it to security@whizpoint.app to keep your account safe.
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Whizpoint Whizpoint Flipbook. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: defaultFrom,
    to,
    subject: 'Welcome to Whizpoint Flipbook! 🎉',
    html,
  });
};

export const sendPasswordResetEmail = async (to: string, resetLink: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Password Reset Request</h1>
        </div>
        <div class="content">
          <p>Hi there,</p>
          <p>We received a request to reset the password for your Whizpoint Flipbook account associated with this email address.</p>
          <p>Click the button below to securely set a new password. This link will expire in 1 hour.</p>
          <center>
            <a href="${resetLink}" class="button">Reset My Password</a>
          </center>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #2563eb; font-size: 14px;">${resetLink}</p>
          
          <div class="security-notice">
            <strong>Security Notice:</strong> This email was sent to ${to}. If you did not request a password reset, please ignore this email. Your account remains secure. If you believe someone is trying to access your account, please contact security@whizpoint.app immediately.
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Whizpoint Whizpoint Flipbook. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: defaultFrom,
    to,
    subject: 'Reset your Whizpoint Flipbook password',
    html,
  });
};

export const sendVerificationEmail = async (to: string, name: string, verifyLink: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>${EMAIL_STYLES}</style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verify your Email 📧</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>Thanks for joining Whizpoint Flipbook! Please verify your email address to unlock your account and start uploading documents.</p>
          <center>
            <a href="${verifyLink}" class="button">Verify Email</a>
          </center>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #2563eb; font-size: 14px;">${verifyLink}</p>
          
          <div class="security-notice">
            <strong>Security Notice:</strong> If you did not create this account, please ignore this email.
          </div>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Whizpoint. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return transporter.sendMail({
    from: defaultFrom,
    to,
    subject: 'Verify your Whizpoint account',
    html,
  });
};

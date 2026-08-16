import nodemailer from "nodemailer";
import { config } from "../config/config.js";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_MAILER_CLIENT_ID,
    clientSecret: config.GOOGLE_MAILER_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});
transporter
  .verify()
  .then(() => {
    console.log("Email transporter is ready to send emails");
  })
  .catch((err) => {
    console.error("Email transporter verification failed",err);
  });
export async function sendEmail({ toEmail, rawToken }) {
  const resetUrl = `${config.FRONTEND_URL}/reset-password/?token=${rawToken}`;
  const mailOptions = {
    from: config.GOOGLE_USER,
    to: toEmail,
    subject: "Password Reset Request",
    html: `<h1>ATELIER</h1>
      <p>You requested a password reset.</p>
      <p>Click the link below to reset your password. This link expires in 10 minutes.</p>
      <a href="${resetUrl}">click here...</a>
      <p>If you didn't request this, please ignore this email.</p>
      `,
  };
  const details = await transporter.sendMail(mailOptions);
  return details;
}
export async function sendPasswordChangedNotification(email) {
  const mailOptions = {
    from: config.GOOGLE_USER,
    to: email,
    subject: "Password Reset Successful",
    html: `<h1>ATELIER</h1>
        <p>Your password has been reset sucessfully</p>
        <p>With regards</p>
        <p>Atelier team</p>
        `,
  };
  await transporter.sendMail(mailOptions);
}

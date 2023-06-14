import { createTransport } from "nodemailer";

const pass = process.env.EMAIL_SERVER_PASSWORD;
export const from = process.env.EMAIL_FROM;

export const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: from,
    pass,
  },
});
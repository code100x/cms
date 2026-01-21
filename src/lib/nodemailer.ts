import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (name: string, email: string, issueDescription: string) => {
  const subject = `User Issue Report: ${name} - ${email}`;
  const text = `A user has reported an issue:

  Name: ${name}
  Email: ${email}

  Issue Description:
  ${issueDescription}

  Please look into this as soon as possible.`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject,
    text,
  });
};

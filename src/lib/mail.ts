import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendPasswordResetTokenEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;
  const res = await resend.emails.send({
    from: '100xdevs <100xdevs@resend.dev>',
    to: email,
    subject: 'Email Verification for Password Reset',
    html: `<p>Below link is valid for only 1hr </p> </br><p><a href="${confirmLink}">here</a>to confirm email.</p>`,
  });
  return res;
};

export default sendPasswordResetTokenEmail;

import transporter from "../configs/nodeMailer";
import rejectedEmailTemplate from "../templates/emails/rejectedEmailTemplate";
import { shortListedEmailTemplate } from "../templates/emails/shortListedEmailTemplate";

const sendEmail = (
  recipientEmail: string,
  recipientName: string,
  jobTitle: string,
  type: string
) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: recipientEmail,
    subject: jobTitle,
    html:
      type === "SHORTLISTED"
        ? shortListedEmailTemplate(jobTitle, recipientName)
        : rejectedEmailTemplate(jobTitle, recipientEmail),
  };

  try {
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        throw new Error(err.message);
      }
      console.log(info.response);
    });
  } catch (error) {
    throw new Error("Email not sent, There was an error");
  }
};

export default sendEmail;

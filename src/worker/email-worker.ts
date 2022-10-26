import { Job } from "bullmq";
import nodemailer from "nodemailer";

// the actual job that the worker has to process
const sendEmailJob = async (job: Job) => {
//   if (job.attemptsMade < 2) {
//     throw new Error("Something happenend.");
//   }
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(job.data);

  console.log("Message sent: %s", info.messageId);

  return nodemailer.getTestMessageUrl(info);
};

export default sendEmailJob;

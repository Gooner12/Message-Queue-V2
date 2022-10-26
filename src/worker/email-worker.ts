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
  await job.updateProgress(50);

  // send mail with defined transport object
  let info = await transporter.sendMail(job.data);

  console.log("Message sent: %s", info.messageId);

  await job.updateProgress(100); // stating that the job has been 100% completed.
  return nodemailer.getTestMessageUrl(info);
};

export default sendEmailJob;

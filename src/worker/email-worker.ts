import { Job } from "bullmq";
import nodemailer from "nodemailer";

// the actual job that the worker has to process
const sendEmailJob = async (job: Job) => {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass, 
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  await job.updateProgress(50);
  let info = await transporter.sendMail(job.data);

  await job.updateProgress(100); 
  return nodemailer.getTestMessageUrl(info);
};

export default sendEmailJob;

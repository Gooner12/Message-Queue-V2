import { Worker, Queue } from "bullmq";
import { queueName } from "../utils/process-constants";
// import sendEmailJob from "../worker/email-worker";
import { connection } from "../config/redis-credentials";
import { Job } from "bullmq";

export const emailQueue = new Queue(queueName, { connection });

// // this is a job adder function
// export const addJob = async (data: Request) => {
//     await emailQueue.add("emailJob", data, {
//       attempts: 5,
//     });
//     console.log("Done");
//   };

const emailWorkerFirst = new Worker(
  queueName,
//   sendEmailJob,
    `${__dirname}/../worker/email-worker.ts`,
  {
    connection,
    concurrency: 10,
  }
);



// checking which worker did the job
emailWorkerFirst.on("completed", async (job: Job, result: any) => {
  console.log("Completed by first worker");
//   await emailWorkerFirst.close();
});


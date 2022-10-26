import { Worker, Queue } from "bullmq";
import { queueName } from "../utils/process-constants";
import { connection } from "../config/redis-credentials";
import { Job } from "bullmq";

export const emailQueue = new Queue(queueName, { connection });

const emailWorkerFirst = new Worker(
  queueName,
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


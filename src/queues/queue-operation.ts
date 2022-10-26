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
    concurrency: 1, // the concurrency determines the no.of jobs processed by a worker at a time
  }
);

const emailWorkerSecond = new Worker(
  queueName,
  `${__dirname}/../worker/email-worker.ts`,
  {
    connection,
    concurrency: 10, // allowing 10 jobs to be processed in parallel
  }
);

// checking which worker did the job
emailWorkerFirst.on("completed", async (job: Job, result: any) => {
  console.log("Completed by first worker");
  // await emailWorkerFirst.close(); // closing the worker after all the job it is working on is finished.
  //  Note: the closing of worker connection depends on the completion of no. of job it takes. In this case, it is determined by the concurrency
});

emailWorkerSecond.on("completed", async (job: Job, result: any) => {
  console.log("Completed by second worker");
});

// handling the error from the events to prevent node raising an unhandled exception and exiting the process.
//  Otherwise, the worker may stop processing remaining jobs when error is emitted
emailWorkerFirst.on("error", (err) => {
  console.log(err);
});

emailWorkerSecond.on("error", (err) => {
  console.log(err);
});

// reporting progress
emailWorkerFirst.on("progress", (job: Job, progress: number | object) => {
  if (progress == 50) {
    console.log("Finalising the email sending process");
  }
  if (progress == 100) {
    console.log("Completed the send process");
  }
});

emailWorkerSecond.on("progress", (job: Job, progress: number | object) => {
  if (progress == 50) {
    console.log("Finalising the email sending process");
  }
  if (progress == 100) {
    console.log("Completed the send process");
  }
});

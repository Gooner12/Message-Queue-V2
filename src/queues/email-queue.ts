// import { Queue, Worker } from "bullmq";
// import { connection } from "../config/redis-credentials";
// const { createBullBoard } = require("@bull-board/api");
// const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
// const { ExpressAdapter } = require("@bull-board/express");
// import { Job } from "bullmq";
// import { queueName } from "../utils/process-constants";

// type Request = {
//   from: string;
//   to: string;
//   subject: string;
//   msg: string;
// };

// const emailQueue = new Queue(queueName, {
//   connection,
// });

// // for visualising emailQueue in bull board ui
// const serverAdapter = new ExpressAdapter();
// serverAdapter.setBasePath("/admin/queues");
// createBullBoard({
//   queues: [new BullMQAdapter(emailQueue)],
//   serverAdapter: serverAdapter,
// });

// const emailWorkerFirst = new Worker(queueName, `${__dirname}/../worker/email-worker.ts`, {
//   connection,
//   concurrency: 10,
// });

// const emailWorkerSecond = new Worker(queueName, `${__dirname}/../worker/email-worker.ts`, {
//   connection,
//   concurrency: 10, // allowing 10 jobs to be processed in parallel
// });

// // this is a job adder function
// export const addJob = async (data: Request) => {
//   await emailQueue.add("emailJob", data, {
//     attempts: 5,
//     delay: 1000,
//   });
// };

// // checking which worker did the job
// emailWorkerFirst.on("completed", async(job: Job, result: any) => {
//   console.log("Completed by first worker");
//   await emailWorkerFirst.close();
// });

// emailWorkerSecond.on("completed", (job: Job, result: any) => {
//   console.log("Completed by second worker");
// });

// emailWorkerFirst.on("error", (err) => {
//   console.log(err);
// });

// emailWorkerSecond.on("error", (err) => {
//   console.log(err);
// });

// export { serverAdapter };

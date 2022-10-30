import { Worker, Queue, QueueEvents } from "bullmq";
import { queueName } from "../utils/process-constants";
import { connection } from "../config/redis-credentials";
import { Job } from "bullmq";

type WorkNode = {
  worker: Worker;
  name: string;
};

export const emailQueue = new Queue(queueName, { connection });
const queueEvents = new QueueEvents(queueName, { connection });

const workerArray = Array.from(Array(4));
for (let index in workerArray) {
  workerArray[index] = new Worker(
    queueName,
    `${__dirname}/../worker/email-worker.ts`,
    {
      connection,
      concurrency: 2,
    }

  );
}

console.log(`The number of worker: ${workerArray.length}`);
let counter = 1;
queueEvents.on("completed", ({ jobId: string, returnvalue: any }) => {
  console.log(`Task completed : ${counter}`);
  counter += 1;
});

// const emailWorkerFirst = new Worker(
//   queueName,
//   `${__dirname}/../worker/email-worker.ts`,
//   {
//     connection,
//     // concurrency: 3,
//   }
// );

// const emailWorkerSecond = new Worker(
//   queueName,
//   `${__dirname}/../worker/email-worker.ts`,
//   {
//     connection,
//     // concurrency: 2,
//   }
// );





// console.log(workerArray);

// checking which worker did the job
const eventListener = (workerObject: WorkNode) => {
  workerObject.worker.on("completed", async (job: Job, result: any) => {
    console.log(`Completed by ${workerObject.name} worker.`);
    // if (workerObject.name === "first") {
    //   await workerObject.worker.close();
    // }
  });
};

// eventListener({worker: emailWorkerFirst, name: "first"});
// eventListener({worker: emailWorkerSecond, name: "second"});

// handling the error from the events to prevent node from raising an unhandled exception and exiting the process.
//  Otherwise, the worker may stop processing remaining jobs when error is emitted
queueEvents.on("error", (error) => {
  throw new Error(error.message);
});

// reporting progress
// queueEvents.on("progress", (args: {jobId: string, data: number | object}) => {
//   if (args.data == 50) {
//     console.log("Finalising the email sending process");
//   }
//   if (args.data == 100) {
//     console.log("Completed the send process");
//   }
// });

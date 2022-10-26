import { emailQueue } from "../queues/queue-operation";

const { createBullBoard } = require("@bull-board/api");
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

type Request = {
  from: string;
  to: string;
  subject: string;
  msg: string;
};

// for visualising emailQueue in bull board ui
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/admin/queues");
createBullBoard({
  queues: [new BullMQAdapter(emailQueue)],
  serverAdapter: serverAdapter,
});

// this is a job adder function
export const addJob = async (data: Request) => {
  await emailQueue.add("emailJob", data, {
    attempts: 5,
    delay: 5000,
    priority: 1,
    removeOnComplete: { // this will influence the number of jobs in a queue after completion. We can see its effect in the bull mq adaptor
      age: 3600, // keep for an hour
      count: 20 // only keep a max of 20 jobs
    }
  });
  // console.log("Done");
};

export { serverAdapter };

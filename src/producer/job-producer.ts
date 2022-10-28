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
    removeOnComplete: { 
      age: 3600, 
      count: 40 
    }
  });
};

export { serverAdapter };

import { Request, Response } from "express";
import { addJob } from "../producer/job-producer";
// import { addJob } from "../queues/email-queue";
// import { addJob } from "../queues/queue-operation";

export const sendEmail = async (req: Request, res: Response) => {
  const { msg, ...otherInfo } = req.body;
  await addJob({...otherInfo, html: `<p>${msg}</p>`});
  res.status(200).json("Ok");
};

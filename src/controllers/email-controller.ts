import { Request, Response } from "express";
import { addJob } from "../producer/job-producer";

export const sendEmail = async (req: Request, res: Response) => {
  // const workerArray = new Array(5);
  // Array.from(Array(5)).forEach(() => console.log("1"));
  const { msg, ...otherInfo } = req.body;
  await addJob({ ...otherInfo, html: `<p>${msg}</p>` });
  res.status(200).json("Ok");
};

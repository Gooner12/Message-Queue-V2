import { Request, Response } from "express";
import { addJob } from "../producer/job-producer";

export const sendEmail = async (req: Request, res: Response) => {
  const { msg, ...otherInfo } = req.body;
  await addJob({...otherInfo, html: `<p>${msg}</p>`});
  res.status(200).json("Ok");
};

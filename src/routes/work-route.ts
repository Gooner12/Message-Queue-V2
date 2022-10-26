import express from "express";
import { sendEmail } from "../controllers/email-controller";

const expressRouter: express.Router = express.Router();

expressRouter.post("/send-email", sendEmail);

export { expressRouter };

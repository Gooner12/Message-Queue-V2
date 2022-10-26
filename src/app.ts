import express from "express";
import { expressRouter } from "./routes/work-route";
import { serverAdapter } from "./producer/job-producer";
// import { serverAdapter } from "./queues/email-queue";

const app: express.Application = express();
app.use(express.json());

app.use("/admin/queues", serverAdapter.getRouter());
app.use("/", expressRouter);

app.listen(5001, () => {
  console.log("Server is listening on port 5001.");
});

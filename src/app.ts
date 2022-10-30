import express from "express";
import { expressRouter } from "./routes/work-route";
import { serverAdapter } from "./producer/job-producer";

const app: express.Application = express();
app.use(express.json());

app.use("/admin/queues", serverAdapter.getRouter());
app.use("/", expressRouter);

app.get("/", async (req, res) => {
  res.send("Welcome from message brokers.");
});

app.listen(5001, () => {
  console.log("Server is listening on port 5001.");
});

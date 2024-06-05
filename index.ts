import express, { Express, Request, Response } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database";
connect();

import Task from "./models/task.model";

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

app.get("/tasks", async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  });
  
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
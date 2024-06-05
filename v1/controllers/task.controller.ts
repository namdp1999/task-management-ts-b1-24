import { Request, Response } from "express";
import Task from "../models/task.model";

// [GET] /api/v1/tasks
export const index = async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false
  });

  res.json(tasks);
}

// [GET] /api/v1/tasks/detail/:id
export const detail = async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  
  res.json(task);
}
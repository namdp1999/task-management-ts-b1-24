import express, { Request, Response, Router } from "express";
import Task from "../../models/task.model";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const tasks = await Task.find({
    deleted: false
  });

  res.json(tasks);
});

router.get("/detail/:id", async (req: Request, res: Response): Promise<void> => {
  const id: string = req.params.id;

  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  
  res.json(task);
});

export const taskRoutes: Router = router;
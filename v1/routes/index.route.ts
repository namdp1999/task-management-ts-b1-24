import { Express } from "express";
import { taskRoutes } from "./task.route";

const v1Route = (app: Express): void => {
  const version = "/api/v1";

  app.use(version + "/tasks", taskRoutes);
}

export default v1Route;
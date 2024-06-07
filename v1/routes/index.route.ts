import { Express } from "express";
import { taskRoutes } from "./task.route";
import { userRoutes } from "./user.route";

const v1Route = (app: Express): void => {
  const version = "/api/v1";

  app.use(version + "/tasks", taskRoutes);

  app.use(version + "/users", userRoutes);
}

export default v1Route;
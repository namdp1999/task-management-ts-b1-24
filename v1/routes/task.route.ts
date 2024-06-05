import express, { Router } from "express";
import * as controller from "../controllers/task.controller";
const router: Router = express.Router();

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const taskRoutes: Router = router;
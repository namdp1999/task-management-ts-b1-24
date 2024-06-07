import express, { Router } from "express";
import * as controller from "../controllers/user.controller";
const router: Router = express.Router();

router.post("/register", controller.register);

export const userRoutes: Router = router;
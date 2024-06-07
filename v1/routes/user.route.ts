import express, { Router } from "express";
import * as controller from "../controllers/user.controller";
const router: Router = express.Router();

router.post("/register", controller.register);

router.post("/login", controller.login);

export const userRoutes: Router = router;
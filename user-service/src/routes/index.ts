import express from "express";
import usersRouter from "./users.router";
import healthRouter from "./health.router";

const router = express.Router();

router.use("/users", usersRouter);
router.use("/health", healthRouter);
export default router;

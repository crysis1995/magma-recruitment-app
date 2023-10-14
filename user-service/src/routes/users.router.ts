import express from "express";
import { userControllers } from "../controllers";
import UserService from "../services/user.service";

const userRouter = express.Router();
const userService = new UserService();

userRouter.get("/", userControllers.getAllUsersController({ userService }));

export default userRouter;

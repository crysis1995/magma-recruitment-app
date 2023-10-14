import express from "express";
import { userControllers } from "../controllers";
import UserService from "../services/user.service";
import { validateLoader } from "../loaders";
import { getAllUsersInput } from "../inputs/user.schema";

const userRouter = express.Router();
const userService = new UserService();

userRouter.get(
    "/",
    validateLoader(getAllUsersInput),
    userControllers.getAllUsersController({ userService }),
);

export default userRouter;

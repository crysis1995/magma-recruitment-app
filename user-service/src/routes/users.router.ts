import express from "express";
import { userControllers } from "../controllers";
import UserService from "../services/user.service";
import {
    createUserInput,
    deleteUserInput,
    getAllUsersInput,
    getUserInput,
    updateUserInput,
} from "../inputs/user.input";
import UserRepository from "../repositories/user.repository";
import { UserModel } from "../schemas/user.schema";
import loggerService from "../services/logger.service";
import { inputValidatorHandler } from "../handlers/inputValidator.handler";

const userRouter = express.Router();
const userRepository = new UserRepository(UserModel);
const userService = new UserService({ userRepository, logger: loggerService });

userRouter
    .get(
        "/",
        inputValidatorHandler(getAllUsersInput),
        userControllers.getAllUsersController({ userService }),
    )
    .get(
        "/:id",
        inputValidatorHandler(getUserInput),
        userControllers.getUserController({ userService }),
    )
    .post(
        "/",
        inputValidatorHandler(createUserInput),
        userControllers.createUserController({ userService }),
    )
    .put(
        "/:id",
        inputValidatorHandler(updateUserInput),
        userControllers.updateUserController({ userService }),
    )
    .delete(
        "/:id",
        inputValidatorHandler(deleteUserInput),
        userControllers.deleteUserController({ userService }),
    );

export default userRouter;

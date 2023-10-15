import { NextFunction, Request, Response } from "express";
import { IUserService } from "../types/user.service.type";
import {
    CreateUserInput,
    DeleteUserInput,
    GetAllUsersInput,
    GetUserInput,
    UpdateUserInput,
} from "../inputs/user.input";

interface InjectedServices {
    userService: IUserService;
}

export const getAllUsersController =
    ({ userService }: InjectedServices) =>
    async (
        req: Request,
        res: Response<{}, GetAllUsersInput>,
        next: NextFunction,
    ) =>
        userService
            .getAllUsers(res.locals.query)
            .then((data) => res.json(data))
            .catch(next);

export const getUserController =
    ({ userService }: InjectedServices) =>
    async (req: Request, res: Response<{}, GetUserInput>, next: NextFunction) =>
        userService
            .getUserById(res.locals.params)
            .then((data) => res.json(data))
            .catch(next);

export const createUserController =
    ({ userService }: InjectedServices) =>
    async (
        req: Request,
        res: Response<{}, CreateUserInput>,
        next: NextFunction,
    ) =>
        userService
            .createUser(res.locals.body)
            .then((userId) => res.json(userId).status(201))
            .catch(next);

export const updateUserController =
    ({ userService }: InjectedServices) =>
    async (
        req: Request,
        res: Response<{}, UpdateUserInput>,
        next: NextFunction,
    ) =>
        userService
            .updateUser(res.locals.params, res.locals.body)
            .then(() => res.status(200).json({ message: "ok" }))
            .catch(next);

export const deleteUserController =
    ({ userService }: InjectedServices) =>
    async (
        req: Request,
        res: Response<{}, DeleteUserInput>,
        next: NextFunction,
    ) =>
        userService
            .deleteUser(res.locals.params)
            .then(() => res.status(200).json({ message: "ok" }))
            .catch(next);

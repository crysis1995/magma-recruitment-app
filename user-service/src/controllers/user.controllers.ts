import { NextFunction, Request, Response } from "express";
import { IUserService } from "../types/user.service.type";

interface InjectedServices {
    userService: IUserService;
}

export const getAllUsersController =
    ({ userService }: InjectedServices) =>
    async (req: Request, res: Response, next: NextFunction) => {
        res.json({ test: "test" });
    };

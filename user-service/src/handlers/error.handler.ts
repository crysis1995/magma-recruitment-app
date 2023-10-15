import { ErrorRequestHandler } from "express";
import { UserNotFoundError } from "../errors/userNotFound.error";
import { UserDataWrongFormatError } from "../errors/userDataWrongFormat.error";
import { ZodError } from "zod";
import { ILoggerService } from "../types/logger.service.type";
import u from "uuid";

export const errorHandler =
    (logger: ILoggerService): ErrorRequestHandler =>
    (err, req, res, next) => {
        let statusCode;
        let response;
        let errorMessage;
        if (err instanceof UserNotFoundError) {
            statusCode = 404;
            response = (err as UserNotFoundError).toJson();
        } else if (err instanceof UserDataWrongFormatError) {
            statusCode = 400;
            response = (err as UserDataWrongFormatError).toJson();
        } else if (err instanceof ZodError) {
            statusCode = 400;
            response = new UserDataWrongFormatError(err).toJson();
        } else {
            const uuid = u.v4();
            statusCode = 500;
            response = {
                message: `Something went wrong! Log id ${uuid}`,
            };
            errorMessage = `Error id ${uuid}`;
        }
        res.status(statusCode).json(response);
        logger.error({ message: errorMessage, err });
    };

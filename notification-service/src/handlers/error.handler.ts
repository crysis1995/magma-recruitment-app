import { ErrorRequestHandler } from "express";
import { ILoggerService } from "../types/logger.service.type";
import u from "uuid";

export const errorHandler =
    (logger: ILoggerService): ErrorRequestHandler =>
    (err, req, res, next) => {
        let statusCode;
        let response;
        let errorMessage;

        const uuid = u.v4();
        statusCode = 500;
        response = {
            message: `Something went wrong! Log id ${uuid}`,
        };
        errorMessage = `Error id ${uuid}`;
        res.status(statusCode).json(response);
        logger.error({ message: errorMessage, err });
    };

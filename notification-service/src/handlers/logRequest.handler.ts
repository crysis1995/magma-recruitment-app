import { ILoggerService } from "../types/logger.service.type";
import { RequestHandler } from "express";

export const logRequestHandler =
    (logger: ILoggerService): RequestHandler =>
    (req, res, next) => {
        const message = `[${req.method}]  ${req.url}`;
        logger.info({ message });
        next();
    };

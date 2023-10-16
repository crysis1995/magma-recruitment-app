import winston, { transports } from "winston";
import { Error } from "mongoose";
import {
    ErrorLogArguments,
    ILoggerService,
    InfoLogArguments,
    WarnLogArguments,
} from "../types/logger.service.type";

const myFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]\t${message}`;
});

class LoggerService implements ILoggerService {
    private logger: winston.Logger;

    constructor() {
        this.logger = winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                myFormat,
            ),
            transports: [new transports.Console()],
        });
    }

    warn({ message, label }: WarnLogArguments): void {
        const labelMess = label ? `[${label}]  ` : "";
        this.logger.warn(labelMess + message);
    }

    info({ message, label }: InfoLogArguments): void {
        const labelMess = label ? `[${label}]  ` : "";
        this.logger.info(labelMess + message);
    }

    error({ message, err, label }: ErrorLogArguments): void {
        const labelMess = label ? `[${label}]  ` : "";
        let logMessage = labelMess + (message ? `${message}\n` : "");
        if (err instanceof Error)
            logMessage += `Error message:${err.message}\nError name:${err.name}\nError stack:\n${err.stack}`;
        else logMessage += err;

        this.logger.error(logMessage);
    }
}

export default new LoggerService();

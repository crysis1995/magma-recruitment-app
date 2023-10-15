import {
    ErrorLogArguments,
    ILoggerService,
    InfoLogArguments,
    WarnLogArguments,
} from "../types/logger.service.type";
import winston, { transports } from "winston";

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

    warn({ message }: WarnLogArguments): void {
        this.logger.warn(message);
    }

    info({ message }: InfoLogArguments): void {
        this.logger.info(message);
    }

    error({ message, err }: ErrorLogArguments): void {
        let logMessage = message ? `${message}\n` : "";
        logMessage += `Error message:${err.message}\nError name:${err.name}\nError stack:\n${err.stack}`;
        this.logger.error(logMessage);
    }
}

export default new LoggerService();

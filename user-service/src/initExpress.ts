import express from "express";
import routers from "./routes";
import { getEnvProperty } from "./services/env.service";
import { EnvProperty } from "./types/env.service.type";
import { errorHandler } from "./handlers/error.handler";
import loggerService from "./services/logger.service";
import { logRequestHandler } from "./handlers/logRequest.handler";

export const initExpress = () => {
    const PORT = getEnvProperty(EnvProperty.AppPort);
    if (!PORT) throw new Error("Empty port!");

    const app = express();

    app.use(express.json());
    app.use(logRequestHandler(loggerService));
    app.use("/", routers);

    app.use(errorHandler(loggerService));

    app.listen(PORT, async () => {
        loggerService.info({ message: `App initialized on port ${PORT}` });
    });
};

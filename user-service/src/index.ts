import { startupFunction } from "@magma/shared.common";
import { initExpress } from "./initExpress";
import dotenv from "dotenv";
import { mongoInit } from "./initializers/mongo.init";
import loggerService from "./services/logger.service";

// must run before all
dotenv.config();
startupFunction(mongoInit(loggerService))
    .then(() => initExpress())
    .catch((err) => {
        loggerService.error({ message: "Internal Error", err });
        process.exit(1);
    });

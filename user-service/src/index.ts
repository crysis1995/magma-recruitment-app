import { initExpress } from "./initExpress";
import dotenv from "dotenv";
import { mongoInit } from "./initializers/mongo.init";
import loggerService from "./services/logger.service";
import { rabbitmqInit } from "./initializers/rabbitmq.init";
import { startupFunction } from "./common/startupFunction";

// must run before all
dotenv.config();
startupFunction(mongoInit(loggerService), rabbitmqInit(loggerService))
    .then(initExpress)
    .catch((err) => {
        loggerService.error({ message: "Internal Error", err });
        process.exit(1);
    });

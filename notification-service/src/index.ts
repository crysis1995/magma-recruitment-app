import dotenv from "dotenv";
import { rabbitmqInit } from "./initializers/rabbitmq.init";
import loggerService from "./services/logger.service";
import { initExpress } from "./initExpress";
import { startupFunction } from "./common/startupFunction";
import { messageConsumerInit } from "./initializers/messageConsumer.init";
// must run before all
dotenv.config();

startupFunction(rabbitmqInit(loggerService))
    .then(initExpress)
    .then(messageConsumerInit)
    .catch((err) => {
        loggerService.error({ message: "Internal Error", err });
        process.exit(1);
    });

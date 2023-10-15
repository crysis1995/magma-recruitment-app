import { getEnvProperty } from "../services/env.service";
import { EnvProperty } from "../types/env.service.type";
import mongoose from "mongoose";
import { ILoggerService } from "../types/logger.service.type";

export const mongoInit = (logger: ILoggerService) => async () => {
    const mongoConnectionString = getEnvProperty(
        EnvProperty.MongoDbConnectionString,
    );
    if (!mongoConnectionString)
        throw new Error("Empty mongo connection string!");

    await mongoose.connect(mongoConnectionString);
    logger.info({ message: "Connected to mongo!" });
};

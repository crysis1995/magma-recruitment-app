import { getEnvProperty } from "../services/env.service";
import { EnvProperty } from "../types/env.service.type";
import mongoose from "mongoose";
import { ILoggerService } from "../types/logger.service.type";

let mongoConnection: typeof mongoose;

export const mongoInit = (logger: ILoggerService) => async () => {
    const mongoConnectionString = getEnvProperty(
        EnvProperty.MongoDbConnectionString,
    );
    if (!mongoConnectionString)
        throw new Error("Empty mongo connection string!");
    try {
        mongoConnection = await mongoose.connect(mongoConnectionString);
        logger.info({ label: "MongoDB", message: "Connected!" });
    } catch (e) {
        logger.error({ err: e });
    }
};

export const getMongoConnection = () => {
    return mongoConnection;
};

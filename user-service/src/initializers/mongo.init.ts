import { getEnvProperty } from "../services/env.service";
import { EnvProperty } from "../types/env.service.type";
import mongoose from "mongoose";

export const mongoInit = async () => {
    const mongoConnectionString = getEnvProperty(
        EnvProperty.MongoDbConnectionString,
    );
    if (!mongoConnectionString)
        throw new Error("Empty mongo connection string!");

    try {
        await mongoose.connect(mongoConnectionString);
        console.log("Connected to mongo!");
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
};

import express from "express";
import routers from "./routes";
import { getEnvProperty } from "./services/env.service";
import { EnvProperty } from "./types/env.service.type";

export const initExpress = () => {
    const PORT = getEnvProperty(EnvProperty.AppPort);
    if (!PORT) throw new Error("Empty port!");

    const app = express();

    app.use("/", routers);

    app.listen(PORT, async () => {
        console.log(`hello from port ${PORT}`);
    });
};

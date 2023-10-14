import express from "express";
import routers from "./routes";

export const initExpress = (PORT: number) => {
    const app = express();

    app.use("/", routers);

    app.listen(PORT, async () => {
        console.log(`hello from port ${PORT}`);
        console.log("nieee tutaj");
    });
};

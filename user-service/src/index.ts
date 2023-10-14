import { startupFunction } from "@magma/shared.common";
import { initExpress } from "./initExpress";
import dotenv from "dotenv";
import { mongoInit } from "./initializers/mongo.init";

dotenv.config();
startupFunction(mongoInit).then(() => initExpress());

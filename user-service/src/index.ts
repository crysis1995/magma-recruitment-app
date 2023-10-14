import { startupFunction } from "@magma/shared.common";
import { initExpress } from "./initExpress";

const PORT = 3000;

startupFunction().then(() => initExpress(PORT));

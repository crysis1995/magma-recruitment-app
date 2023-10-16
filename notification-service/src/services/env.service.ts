import { EnvProperty } from "../types/env.service.type";

export const getEnvProperty = (property: EnvProperty) => {
    return process.env[property] || null;
};

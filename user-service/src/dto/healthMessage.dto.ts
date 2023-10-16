import { TypeOf, z } from "zod";

export const healthCheck = z.object({
    isHealth: z.boolean(),
    name: z.string(),
});
export type HealthCheck = TypeOf<typeof healthCheck>;

export const healthMessageDto = z.object({
    isHealth: z.boolean(),
    services: z.array(healthCheck),
});
export type HealthMessageDto = TypeOf<typeof healthMessageDto>;

import { any, object, string, TypeOf, unknown } from "zod";

export const messageDto = object({
    type: string(),
    data: unknown(),
});
export type MessageDto = TypeOf<typeof messageDto>;

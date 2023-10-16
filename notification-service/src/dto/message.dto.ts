import { object, string, TypeOf } from "zod";

export const messageDto = object({
    type: string(),
    data: object({ id: string() }),
});
export type MessageDto = TypeOf<typeof messageDto>;

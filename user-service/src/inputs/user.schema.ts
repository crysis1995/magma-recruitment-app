import { any, number, object, string, TypeOf } from "zod";

export const createUserInput = object({
    body: object({
        name: string({ required_error: "name is required" }),
        email: string({ required_error: "email is required" }).email(),
    }),
});
export type CreateUserInput = TypeOf<typeof createUserInput>;

export const getAllUsersInput = object({
    query: object({
        page_start: any().optional(),
        count: number().int().optional(),
    }),
});
export type GetAllUsersInput = TypeOf<typeof getAllUsersInput>;

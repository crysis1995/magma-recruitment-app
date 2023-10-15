import { AnyZodObject, number, object, TypeOf, z } from "zod";
import { userIdDto } from "../dto/userId.dto";
import { userDto } from "../dto/user.dto";

const requestBody = <T extends AnyZodObject>(body: T) => object({ body });
const requestQuery = <T extends AnyZodObject>(query: T) => object({ query });
const requestParam = <T extends AnyZodObject>(params: T) => object({ params });

const paginationInput = object({
    page_start: z.preprocess(Number, number().min(0)).optional().default(0),
    page_count: z
        .preprocess(Number, number().int().min(1))
        .optional()
        .default(10),
});
export type PaginationInput = TypeOf<typeof paginationInput>;

export const createUserInput = requestBody(
    userDto.pick({ name: true, email: true }),
);
export type CreateUserInput = TypeOf<typeof createUserInput>;

export const updateUserInput = requestBody(
    userDto.pick({ name: true, email: true }).partial(),
).merge(requestParam(userIdDto));
export type UpdateUserInput = TypeOf<typeof updateUserInput>;

export const getAllUsersInput = requestQuery(paginationInput);
export type GetAllUsersInput = TypeOf<typeof getAllUsersInput>;

export const getUserInput = requestParam(userIdDto);
export type GetUserInput = TypeOf<typeof getUserInput>;

export const deleteUserInput = requestParam(userIdDto);
export type DeleteUserInput = TypeOf<typeof deleteUserInput>;

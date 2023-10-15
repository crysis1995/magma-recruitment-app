import { TypeOf } from "zod";
import { userDto } from "./user.dto";

export const createUserDto = userDto.pick({
    name: true,
    email: true,
});
export type CreateUserDto = TypeOf<typeof createUserDto>;

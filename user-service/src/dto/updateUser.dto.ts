import { TypeOf } from "zod";
import { userDto } from "./user.dto";

export const updateUserDto = userDto
    .pick({
        name: true,
        email: true,
    })
    .partial({ name: true, email: true });

export type UpdateUserDto = TypeOf<typeof updateUserDto>;

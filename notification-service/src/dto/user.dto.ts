import { date, object, string, TypeOf, z } from "zod";
import mongoose from "mongoose";

export const userDto = object({
    id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val)),
    name: string(),
    email: string().email(),
    createdAt: date(),
});
export type UserDto = TypeOf<typeof userDto>;

import { TypeOf } from "zod";
import { userDto } from "./user.dto";

export const userIdDto = userDto.pick({ id: true }).required();
export type UserIdDto = TypeOf<typeof userIdDto>;

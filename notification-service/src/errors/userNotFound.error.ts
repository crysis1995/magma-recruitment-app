import { Error } from "mongoose";
import { UserIdDto } from "../dto/userId.dto";
import { IJSONishError } from "../types/jsonishError.type";

export class UserNotFoundError extends Error implements IJSONishError {
    constructor(userId: UserIdDto) {
        super(`User ${userId.id} not found!`);
    }

    toJson(): { message: string } {
        return {
            message: this.message,
        };
    }
}

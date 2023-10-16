import { Error } from "mongoose";
import { IJSONishError } from "../types/jsonishError.type";
import { ZodError } from "zod";

export class UserDataWrongFormatError extends Error implements IJSONishError {
    private zodError: ZodError;

    constructor(zodError: ZodError) {
        super("Wrong data format!");
        this.zodError = zodError;
    }

    toJson(): { message: string; values: { message: string }[] } {
        return {
            message: this.message,
            values: this.zodError.errors.map(({ message, path }) => ({
                message,
                key: path.join("."),
            })),
        };
    }
}

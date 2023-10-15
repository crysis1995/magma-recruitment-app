import { Error } from "mongoose";

export type InfoLogArguments = {
    message: string;
};

export type WarnLogArguments = {
    message: string;
};

export type ErrorLogArguments = {
    message?: string;
    err: Error;
};

export interface ILoggerService {
    info(args: InfoLogArguments): void;
    warn(args: WarnLogArguments): void;
    error(args: ErrorLogArguments): void;
}

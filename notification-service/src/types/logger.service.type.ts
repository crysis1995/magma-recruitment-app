export type InfoLogArguments = {
    message: string;
    label?: string;
};

export type WarnLogArguments = {
    message: string;
    label?: string;
};

export type ErrorLogArguments = {
    label?: string;
    message?: string;
    err: any;
};

export interface ILoggerService {
    info(args: InfoLogArguments): void;

    warn(args: WarnLogArguments): void;

    error(args: ErrorLogArguments): void;
}

import { MessageDto } from "../dto/message.dto";

export type IMessageConsumer = (message:MessageDto) => any;

export type IMessageAggregator = {
    [name: string]: IMessageConsumer;
};

export interface IMessageService {
    consumeMessages(): Promise<any>;
}

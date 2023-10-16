import { IQueueMessage } from "./queueMessage.type";

export interface IMessageService {
    sendMessage(message: IQueueMessage): void;
}

import { MessageDto } from "../dto/message.dto";

export abstract class IQueueMessage {
    constructor(type: string) {
        this.type = type;
    }
    type: string;
    getMessage(): MessageDto {
        return {
            type: this.type,
        };
    }
}

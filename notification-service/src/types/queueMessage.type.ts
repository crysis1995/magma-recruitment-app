import { MessageDto } from "../dto/message.dto";

export abstract class IQueueMessage {
    type: string;

    constructor(type: string) {
        this.type = type;
    }

    getMessage(): { type: string } {
        return {
            type: this.type,
        };
    }
}

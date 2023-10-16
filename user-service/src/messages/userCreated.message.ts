import { MessageDto } from "../dto/message.dto";
import { IQueueMessage } from "../types/queueMessage.type";
import { UserIdDto } from "../dto/userId.dto";

export default class UserCreatedMessage extends IQueueMessage {
    private userIdDto: UserIdDto;

    constructor(userIdDto: UserIdDto) {
        super("UserCreatedMessage");
        this.userIdDto = userIdDto;
    }

    getMessage(): MessageDto {
        return {
            ...super.getMessage(),
            data: this.userIdDto,
        };
    }
}

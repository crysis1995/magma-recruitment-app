import { MessageDto } from "../dto/message.dto";
import { IQueueMessage } from "../types/queueMessage.type";
import { UserIdDto } from "../dto/userId.dto";

export default class UserDeletedMessage extends IQueueMessage {
    private userIdDto: UserIdDto;

    constructor(userIdDto: UserIdDto) {
        super("UserDeletedMessage");
        this.userIdDto = userIdDto;
    }

    getMessage(): MessageDto {
        return {
            ...super.getMessage(),
            data: this.userIdDto,
        };
    }
}

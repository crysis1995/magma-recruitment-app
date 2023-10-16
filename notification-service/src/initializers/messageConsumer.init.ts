import MessageService from "../services/message.service";
import loggerService from "../services/logger.service";
import { userDeletedMessageConsumer } from "../consumers/userDeletedMessage.consumer";
import { userCreatedMessageConsumer } from "../consumers/userCreatedMessage.consumer";
import { IMessageAggregator } from "../types/message.service.type";

const messageConsumersAggregator: IMessageAggregator = {
    UserCreatedMessage: userCreatedMessageConsumer,
    UserDeletedMessage: userDeletedMessageConsumer,
};
export const messageConsumerInit = () => {
    return new MessageService(
        { logger: loggerService },
        messageConsumersAggregator,
    )
        .consumeMessages()
        .catch((err) =>
            loggerService.error({
                err,
            }),
        );
};

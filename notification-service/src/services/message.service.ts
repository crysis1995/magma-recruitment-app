import {
    IMessageAggregator,
    IMessageService,
} from "../types/message.service.type";
import { getEnvProperty } from "./env.service";
import { EnvProperty } from "../types/env.service.type";
import { getChannel } from "../initializers/rabbitmq.init";
import { ILoggerService } from "../types/logger.service.type";
import { messageDto } from "../dto/message.dto";

interface InjectedServices {
    logger: ILoggerService;
}

export default class MessageService implements IMessageService {
    private queueName: string;
    private logger: ILoggerService;
    private messageConsumers: IMessageAggregator;

    constructor(
        { logger }: InjectedServices,
        messageConsumers: IMessageAggregator,
    ) {
        this.logger = logger;
        this.queueName =
            getEnvProperty(EnvProperty.RabbitMQUserQueueName) || "user-queue";
        this.messageConsumers = messageConsumers;
    }

    async consumeMessages(): Promise<any> {
        const channel = getChannel();
        if (!channel) {
            throw new Error("Channel unavailable!");
        }
        await channel.consume(this.queueName, (message) => {
            if (!message) throw new Error("Empty message");

            const parsedMessage = messageDto.safeParse(
                JSON.parse(message.content.toString()),
            );
            if (parsedMessage.success) {
                channel.ack(message);
                this.logger.info({
                    label: "RabbitMQ",
                    message: `Message consumed`,
                });
                if (parsedMessage.data.type in this.messageConsumers)
                    this.messageConsumers[parsedMessage.data.type](
                        parsedMessage.data,
                    );
            }
        });
    }
}

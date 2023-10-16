import { IMessageService } from "../types/message.service.type";
import { getEnvProperty } from "./env.service";
import { EnvProperty } from "../types/env.service.type";
import { IQueueMessage } from "../types/queueMessage.type";
import { getChannel } from "../initializers/rabbitmq.init";
import { ILoggerService } from "../types/logger.service.type";

interface InjectedServices {
    logger: ILoggerService;
}

export default class MessageService implements IMessageService {
    private queueName: string;
    private logger: ILoggerService;

    constructor({ logger }: InjectedServices) {
        this.logger = logger;
        this.queueName =
            getEnvProperty(EnvProperty.RabbitMQUserQueueName) || "user-queue";
    }

    sendMessage(message: IQueueMessage): void {
        const channel = getChannel();
        if (!channel) {
            this.logger.error({
                label: "RabbitMQ",
                err: new Error("Channel unavailable!"),
            });
        }
        try {
            const buffer = Buffer.from(JSON.stringify(message.getMessage()));
            channel.sendToQueue(this.queueName, buffer);
            this.logger.info({
                label: "RabbitMQ",
                message: `Message ${message.type} send`,
            });
        } catch (e) {
            this.logger.error({
                label: "RabbitMQ",
                message: "RabbitMQ Error!",
                err: e,
            });
        }
    }
}

import { ILoggerService } from "../types/logger.service.type";
import ampq from "amqplib";
import { EnvProperty } from "../types/env.service.type";
import { notNull } from "../common";
import { getEnvProperty } from "../services/env.service";

let connection: ampq.Connection;
let channel: ampq.Channel;

export const rabbitmqInit = (logger: ILoggerService) => async () => {
    const rabbitConnectionString = getEnvProperty(
        EnvProperty.RabbitMQConnectionString,
    );
    if (!rabbitConnectionString) {
        throw new Error("Empty rabbit connection string");
    }

    try {
        connection = await ampq.connect(rabbitConnectionString);

        logger.info({ label: "RabbitMQ", message: "Connected" });
        channel = await connection.createChannel();

        const queues = [
            getEnvProperty(EnvProperty.RabbitMQUserQueueName),
        ].filter(notNull);
        await Promise.all(
            queues.map((queueName) =>
                channel.assertQueue(queueName).then(() =>
                    logger.info({
                        label: "RabbitMQ",
                        message: `Queue [${queueName}] connected`,
                    }),
                ),
            ),
        );
    } catch (e) {
        logger.error({ err: e });
    }
};

export function getConnection() {
    return connection;
}

export function getChannel() {
    return channel;
}

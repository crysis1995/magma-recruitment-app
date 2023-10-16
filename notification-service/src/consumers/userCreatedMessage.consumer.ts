import { IMessageConsumer } from "../types/message.service.type";

export const userCreatedMessageConsumer: IMessageConsumer = (message) => {
    console.log(`Hello user ${message.data.id}`);
};

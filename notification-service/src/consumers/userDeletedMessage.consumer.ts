import { IMessageConsumer } from "../types/message.service.type";

export const userDeletedMessageConsumer: IMessageConsumer = (message) => {
    console.log(`User ${message.data.id} deleted`);
};

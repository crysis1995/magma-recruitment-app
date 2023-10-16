import { IHealthChecker } from "../types/health.checker.type";
import { getEnvProperty } from "../services/env.service";
import { EnvProperty } from "../types/env.service.type";
import { Error } from "mongoose";
import ampq from "amqplib";

export default class RabbitMQHealthChecker implements IHealthChecker {
    private status: boolean = false;

    async checkHealth(): Promise<IHealthChecker> {
        try {
            const rabbitConnectionString = getEnvProperty(
                EnvProperty.RabbitMQConnectionString,
            );
            if (!rabbitConnectionString) {
                throw new Error("Empty rabbit connection string");
            }
            await ampq.connect(rabbitConnectionString);
            this.status = true;
        } catch (e) {
            this.status = false;
        }
        return this;
    }

    getHealthStatus(): boolean {
        return this.status;
    }

    getServiceName(): string {
        return "RabbitMQ";
    }
}

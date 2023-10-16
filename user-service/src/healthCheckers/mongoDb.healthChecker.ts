import { IHealthChecker } from "../types/health.checker.type";
import { getMongoConnection } from "../initializers/mongo.init";

export default class MongoDbHealthChecker implements IHealthChecker {
    private status: boolean = false;

    async checkHealth(): Promise<IHealthChecker> {
        try {
            this.status = getMongoConnection().connection.readyState === 1;
        } catch (e) {
            this.status = false;
        }
        return this;
    }

    getHealthStatus(): boolean {
        return this.status;
    }

    getServiceName(): string {
        return "MongoDB";
    }
}

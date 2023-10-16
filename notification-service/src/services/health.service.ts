import { IHealthService } from "../types/health.service.type";
import { IHealthChecker } from "../types/health.checker.type";
import { HealthCheck, HealthMessageDto } from "../dto/healthMessage.dto";

export default class HealthService implements IHealthService {
    private checkers: IHealthChecker[];

    constructor(...checkers: IHealthChecker[]) {
        this.checkers = checkers;
    }

    async isHealth(): Promise<HealthMessageDto> {
        const data = await Promise.all(
            this.checkers.map((x) => x.checkHealth()),
        );
        if (data.length === 0)
            return {
                services: [],
                isHealth: true,
            };

        const services = data.map<HealthCheck>((x) => {
            return {
                isHealth: x.getHealthStatus(),
                name: x.getServiceName(),
            };
        });
        return {
            isHealth: services.every((x) => x.isHealth),
            services: services,
        };
    }
}

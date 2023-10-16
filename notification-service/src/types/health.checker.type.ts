export interface IHealthChecker {
    checkHealth(): Promise<IHealthChecker>;

    getServiceName(): string;

    getHealthStatus(): boolean;
}

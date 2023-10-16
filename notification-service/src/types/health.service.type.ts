import { HealthMessageDto } from "../dto/healthMessage.dto";

export interface IHealthService {
    isHealth():Promise<HealthMessageDto>
}
import { RequestHandler } from "express";
import HealthService from "../services/health.service";
import RabbitMQHealthChecker from "../healthCheckers/rabbitMQ.healthChecker";

const healthService = new HealthService(new RabbitMQHealthChecker());
export const healthController: RequestHandler = async (req, res, next) =>
    healthService
        .isHealth()
        .then((healthCheck) => res.status(200).json(healthCheck))
        .catch((err) => next(err));

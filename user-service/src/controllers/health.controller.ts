import { RequestHandler } from "express";
import RabbitMQHealthChecker from "../healthCheckers/rabbitMQ.healthChecker";
import HealthService from "../services/health.service";
import MongoDbHealthChecker from "../healthCheckers/mongoDb.healthChecker";

const healthService = new HealthService(new RabbitMQHealthChecker(), new MongoDbHealthChecker());
export const healthController: RequestHandler = async (req, res, next) =>
    healthService
        .isHealth()
        .then((healthCheck) => res.status(200).json(healthCheck))
        .catch((err) => next(err));

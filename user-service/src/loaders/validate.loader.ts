import { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
export const validateLoader =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (e: any) {
            res.status(400).send(e.errors);
        }
    };


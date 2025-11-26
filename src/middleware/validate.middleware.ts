import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

// schemaType: { body?: ZodObject, params?: ZodObject }
export const validateSchema =
  (schema: { body?: ZodObject<any>; params?: ZodObject<any> }) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body if schema.body exists
      if (schema.body) {
        schema.body.parse(req.body);
      }

      // Validate params if schema.params exists
      if (schema.params) {
        schema.params.parse(req.params);
      }

      next();
    } catch (err: any) {
      res.status(400).json({ message: err.errors });
    }
  };

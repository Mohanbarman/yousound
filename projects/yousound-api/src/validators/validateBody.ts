/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, NextFunction, Response } from "express";
import { buildResponse } from "../utils/buildResponse";

/**
 * Responsible to validating request body
 * @param name validator name, format : validators/fieldName
 */
export const validateBody =
  (name: string) => async (req: Request, res: Response, next: NextFunction) => {
    const [type, schema] = name.split("/");

    const objectSchemas = await import(`./${type}/schemas.ts`);
    const objectSchema = objectSchemas[schema];

    try {
      await objectSchema.validate(req.body);
      next();
    } catch (e) {
      res.json(
        buildResponse({
          error: { code: "VALIDATION_FAILED", validationErrors: e },
        })
      );
    }
  };

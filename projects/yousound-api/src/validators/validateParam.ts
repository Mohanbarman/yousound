/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as yup from "yup";
import { Request, NextFunction, Response } from "express";
import { buildResponse } from "../utils/buildResponse";

/**
 * Validate a url param
 * Example /users/:id
 * @param name validator name, format : validators/fieldName
 */
export const validateParam =
  (name: string, paramName: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const [type, field] = name.split("/");
    const param = req.params[field];

    const fields = await import(`./${type}/fields.ts`);
    const fieldSchema = fields[field];

    const yupSchema = yup.object().shape({
      [paramName]: fieldSchema,
    });

    try {
      await yupSchema.validate({ [paramName]: param });
      next();
    } catch (e) {
      res.json(
        buildResponse({
          error: { code: "VALIDATION_FAILED", validationErrors: e },
        })
      );
    }
  };

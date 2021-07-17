import { Response, NextFunction } from "express";
import { TRequest } from "../types/context.types";
import { userHelpers } from "../utils/userHelpers";

export const getUser = async (
  req: TRequest,
  _: Response,
  next: NextFunction
): Promise<any> => {
  const userId = parseInt(req.session.userID);

  if (!userId) {
    return next();
  }

  const user = await userHelpers.getById(userId);

  req.user = user;

  next();
};

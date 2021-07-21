import { Response, NextFunction } from "express";
import { userErrors } from "../errors";
import { TRequest } from "../types/context.types";
import { userHelpers } from "../utils/userHelpers";

/**
 * Sets user in request object if user is authenticated
 */
export const getUser = async (
  req: TRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = parseInt(req.session.userID);

  // no user id in session
  if (!userId) {
    return next();
  }

  // getting user by user id
  const user = await userHelpers.getById(userId);

  // user id not found in database
  if (!user) {
    return res.json(userErrors.notFound);
  }

  // setting user in user object
  req.user = user;

  // calling next middleware
  next();
};

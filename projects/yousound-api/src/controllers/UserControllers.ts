import { Response } from "express";
import { userErrors } from "../errors";

import { TRequest } from "../types/context.types";
import { buildResponse } from "../utils";
import { userHelpers } from "../utils/userHelpers";

/**
 * Gets logged in user object from user's session
 * @route GET /me
 */
export const getMe = async (req: TRequest, res: Response): Promise<number> => {
  const userId = parseInt(req.session.userID);

  const user = await userHelpers.getById(userId);

  // user not found
  if (!user) {
    res.json(userErrors.notFound);
    return -1;
  }

  res.send(buildResponse({ success: true, data: user }));
  return 0;
};

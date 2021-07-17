import { Response } from "express";

import { TRequest } from "../types/context.types";
import { userHelpers } from "../utils/userHelpers";

export const meController = async (
  req: TRequest,
  res: Response
): Promise<void> => {
  const userId = parseInt(req.session.userID);

  const dbUser = await userHelpers.getById(userId);

  res.send(dbUser);
};

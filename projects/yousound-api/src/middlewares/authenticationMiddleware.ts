import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAccessTokenResponse } from "@packages/google-oauth";

import { JWT_ACCESS_TOKEN } from "../config/env";

export const authenticateUser = async (
  req: Request & { user: IAccessTokenResponse },
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken: string = req.cookies["Authorization"];

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  const bearerToken = accessToken.split(" ")[1];

  jwt.verify(bearerToken, JWT_ACCESS_TOKEN, (err, user: IAccessTokenResponse) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
};

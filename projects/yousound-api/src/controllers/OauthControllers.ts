import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { googleOauth } from "..";
import { JWT_ACCESS_TOKEN } from "../config/env";

export const googleAuthorizationController = async (req: Request, res: Response): Promise<void> => {
  const authCode = req.query.code;

  // code param not present
  if (typeof authCode !== "string") {
    res.json({ error: "code is required" });
    return;
  }

  // getting oauth token object from google oauth server
  const oauthToken = await googleOauth.getToken(authCode);

  // creating jwt signed key containing refresh and accesstokens
  const bearerToken = jwt.sign(oauthToken.data, JWT_ACCESS_TOKEN);

  // setting Authorization cookie with bearer token
  res.cookie("Authorization", `Bearer ${bearerToken}`);

  // redirecting (optional)
  res.redirect("/me");
};

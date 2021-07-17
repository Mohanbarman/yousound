import { Request, Response } from "express";
import { googleOauth } from "../app";

export const loginController = (_: Request, res: Response): void => {
  const googleOauthUrl = googleOauth.authUrl("offline");
  res.redirect(googleOauthUrl);
};

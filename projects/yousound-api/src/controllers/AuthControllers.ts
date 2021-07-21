import { Request, Response } from "express";
import { googleOauth } from "../app";

/**
 * Redirects to google oauth consent screen
 * @route GET /login
 */
export const loginController = (_: Request, res: Response): void => {
  const googleOauthUrl = googleOauth.authUrl("offline");
  res.redirect(googleOauthUrl);
};

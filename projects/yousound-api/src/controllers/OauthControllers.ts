import { Request, Response } from "express";
import { youtubeApi } from "..";

export const googleAuthorizationController = async (req: Request, res: Response) => {
  const authCode = req.query.code;

  if (typeof authCode !== "string") {
    res.json({ error: "code is required" });
    return;
  }

  const authToken = await youtubeApi.getToken(authCode);
  youtubeApi.setToken(authToken);

  const accessToken = authToken.tokens.access_token;

  res.cookie("Authorization", accessToken);

  res.redirect("/me");
};

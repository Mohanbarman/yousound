import { Request, Response } from "express";
import { youtubeApi } from "..";

export const loginController = (_: Request, res: Response) => {
  const googleOauthUrl = youtubeApi.getAuthUrl();
  res.send(`<a href='${googleOauthUrl}'>Login with google</a>`);
};

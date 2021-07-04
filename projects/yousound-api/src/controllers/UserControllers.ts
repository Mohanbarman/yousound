import { IAccessTokenResponse } from "@packages/google-oauth";
import { Request, Response } from "express";
import { googleOauth } from "..";

export const meController = async (
  req: Request & { user: IAccessTokenResponse },
  res: Response
): Promise<void> => {
  const authToken = req.cookies.Authorization;

  if (!authToken) {
    res.redirect("/login");
    return;
  }

  const userInfo = await googleOauth.getUserInfo(req.user.id_token, req.user.access_token);

  res.send(userInfo);
};

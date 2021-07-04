import { NextFunction, Request, Response } from "express";
import { youtubeApi } from "..";

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken: string = req.cookies["Authorization"];

  if (!accessToken) {
    res.sendStatus(401);
    return;
  }

  try {
    const tokenInfo = await youtubeApi.oauthclient.getTokenInfo(accessToken);
    if (tokenInfo) {
      youtubeApi.oauthclient.credentials.access_token = accessToken;
      youtubeApi.oauthclient.credentials.expiry_date = tokenInfo.expiry_date;
      youtubeApi.oauthclient.credentials.id_token = tokenInfo.user_id;
      youtubeApi.oauthclient.credentials.scope = tokenInfo.scopes.join(" ");
      next(tokenInfo);
    } else {
      res.sendStatus(401);
    }
  } catch (e) {
    res.sendStatus(401);
  }
};

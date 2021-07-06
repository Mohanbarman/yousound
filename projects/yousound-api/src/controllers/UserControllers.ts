import { IAccessTokenResponse } from "@packages/google-oauth";
import { Request, Response } from "express";
import { googleOauth, youtubeApi } from "..";

type Request_ = Request & { user: IAccessTokenResponse };

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

export const getMyPlaylists = async (req: Request_, res: Response): Promise<void> => {
  const playlists = await youtubeApi.getMyPlaylists(req.user.access_token, {
    part: ["id"],
    mine: true,
  });
  res.json(playlists);
};

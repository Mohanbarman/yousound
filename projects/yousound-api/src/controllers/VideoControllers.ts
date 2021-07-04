import { IAccessTokenResponse } from "@packages/google-oauth";
import { Request, Response } from "express";
import { youtubeApi } from "..";

type Request_ = Request & { user: IAccessTokenResponse };

export const getMyPlaylists = async (req: Request_, res: Response): Promise<void> => {
  const playlists = await youtubeApi.getMyPlaylists(req.user.access_token, {
    part: ["id"],
    mine: true,
  });
  res.json(playlists);
};

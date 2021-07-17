import { Response } from "express";

import { TRequest } from "../types/context.types";
import { youtubeApi } from "../app";
import { youtubeErrors } from "../errors";
import { buildResponse } from "../utils";
import { UserEntity } from "../entities";

export const getMyPlaylists = async (
  req: TRequest,
  res: Response
): Promise<any> => {
  const user = req.user;

  const { data, error } = await youtubeApi.getMyPlaylists(user.accessToken, {
    part: ["contentDetails", "id", "status", "snippet"],
    mine: true,
  });

  if (error) {
    return res.json(youtubeErrors.playlistFetch(error));
  }

  return res.json(buildResponse({ success: true, data: data }));
};

export const getAllVideos = async (
  req: TRequest,
  res: Response
): Promise<any> => {
  const playlistId = req.params.id;
  const user = req.user;
};

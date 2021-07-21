import { Response } from "express";

import { TRequest } from "../types/context.types";
import { youtubeApi } from "../app";
import { youtubeErrors } from "../errors";
import { buildResponse } from "../utils";

/**
 * Get all playlist created by user
 * @route GET /playlists
 */
export const getMyPlaylists = async (
  req: TRequest,
  res: Response
): Promise<number> => {
  const user = req.user;

  // fething user's playlists
  const { data, error } = await youtubeApi.getMyPlaylists(user.accessToken, {
    part: ["contentDetails", "id", "status", "snippet"],
    mine: true,
  });

  // failed to fetch playlists
  if (error) {
    res.json(youtubeErrors.playlistFetch(error));
    return -1;
  }

  res.json(buildResponse({ success: true, data: data }));
};

/**
 * Get all videos from a playlist using playlist id
 * @route GET /playlists/:id
 */
export const getAllVideosFromPlaylist = async (
  req: TRequest,
  res: Response
): Promise<number> => {
  const playlistId = req.params.id;
  const user = req.user;

  // page token for getting a page
  const pageToken = req.query.pageToken?.toString();
  // page size
  const limit = parseInt(req.query.limit.toString());

  // getting all videos from the playlist
  const { data, error } = await youtubeApi.getPlaylistItems(
    playlistId,
    user.accessToken,
    {
      part: ["contentDetails", "id", "status", "snippet"],
      maxResults: limit,
      pageToken,
    }
  );

  // failed to get playlists
  if (error) {
    res.json(youtubeErrors.playlistNotFound);
    return -1;
  }

  res.json(buildResponse({ success: true, data }));
};

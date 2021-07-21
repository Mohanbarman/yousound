import { Response } from "express";
import { youtubeApi } from "../app";
import { youtubeErrors } from "../errors";
import { TRequest } from "../types/context.types";
import { buildResponse } from "../utils";

/**
 * Search for a video
 * @route GET /search
 */
export const searchQuery = async (
  req: TRequest,
  res: Response
): Promise<number> => {
  const query = req.query.q.toString();

  // page limit
  const limit = parseInt(req.query.limit.toString());

  // page identifier
  const pageToken = req.query.pageToken?.toString();

  // getting logged in user
  const user = req.user;

  // fetching search results from youtube data api
  const { data, error } = await youtubeApi.searchQuery(user.accessToken, {
    q: query,
    type: ["video"],
    maxResults: limit,
    pageToken,
    part: ["id", "snippet"],
  });

  // failed to search
  if (error) {
    res.json(youtubeErrors.searchFailed);
    return -1;
  }

  res.json(buildResponse({ success: true, data }));
};

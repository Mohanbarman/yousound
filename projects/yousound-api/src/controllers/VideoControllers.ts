import { Request, Response } from "express";
import { getAudioUrl } from "@packages/youtube-dl";
import { buildResponse } from "../utils";
import { youtubeErrors } from "../errors";

/**
 * Get audio url of a youtube video using youtube-dl
 * @route GET /video/:id
 */
export const getAudio = async (req: Request, res: Response): Promise<void> => {
  const videoId: string = req.params.id;

  // getting audio url using youtube-dl binary
  const { data, error } = await getAudioUrl(videoId);

  // failed to fetch audio url
  if (error) {
    res.json(youtubeErrors.youtubeDlFailed);
    return;
  }

  res.json(buildResponse({ success: true, data: { url: data } }));
};

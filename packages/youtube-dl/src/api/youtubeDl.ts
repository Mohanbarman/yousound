import { execPromise } from "../utils";
import { getVideoUrlById } from "@packages/youtube-api";
import { IApiCallReturn } from "@packages/types";

/**
 * Extracts audio url of a youtube video by id using youtube-dl binary
 * @param videoId ID of youtube video
 */
export const getAudioUrl = async (videoId: string): Promise<IApiCallReturn<string>> => {
  // getting youtube video url
  const videoUrl = getVideoUrlById(videoId);

  // youtube-dl command for getting audio url
  const command = `youtube-dl -f bestaudio -g ${videoUrl}`;

  // running youtube-dl binary
  const { error, stderr, stdout } = await execPromise(command);

  return { error: error?.message || stderr, data: stdout };
};

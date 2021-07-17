import { buildResponse, IResponse } from "../utils";

export const youtubeErrors = {
  playlistFetch: (message: string): IResponse<unknown, unknown> => {
    return buildResponse({
      success: false,
      error: {
        code: "PLAYLIST_FAILED",
        description: message,
      },
    });
  },
};

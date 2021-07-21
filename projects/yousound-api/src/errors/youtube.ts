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

  playlistNotFound: buildResponse({
    success: false,
    error: {
      code: "PLAYLIST_NOT_FOUND",
      description: "Playlist not found by id",
    },
  }),

  youtubeDlFailed: buildResponse({
    success: false,
    error: {
      code: "YOUTUBE_DL_FAILED",
      description: "Youtub-dl failed to find the video",
    },
  }),

  searchFailed: buildResponse({
    success: false,
    error: {
      code: "SEARCH_FAILED",
      description: "Failed to search for the video",
    },
  }),
};

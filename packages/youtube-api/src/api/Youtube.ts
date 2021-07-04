import { IOauthConfig, IApiCallReturn } from "@packages/types";
import axios from "axios";
import { IPlaylistsOptions, IPlaylistsResponse } from "../types/playlists.types";

const ENDPOINTS = {
  PLAYLISTS: "https://www.googleapis.com/youtube/v3/playlists",
};

/**
 * Responsible for interacting with google youtube api
 */
export default class YoutubeApi {
  config: IOauthConfig;

  constructor(config: IOauthConfig) {
    this.config = config;
  }

  async getMyPlaylists(
    accessToken: string,
    options: IPlaylistsOptions
  ): Promise<IApiCallReturn<IPlaylistsResponse>> {
    try {
      const res = await axios.get(ENDPOINTS.PLAYLISTS, {
        params: options,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return { data: res.data, error: null };
    } catch (e) {
      return { data: null, error: e.message };
    }
  }
}

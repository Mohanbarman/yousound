import { IOauthConfig, IApiCallReturn } from "@packages/types";
import axios, { AxiosResponse } from "axios";
import { endpoints } from "../config/endpoints";
import {
  IPlaylistsOptions,
  IPlaylistsResponse,
  IPlaylistItemsResponse,
} from "../types";
import { ISearchOptions, ISearchResponse } from "../types/search.types";

/**
 * Responsible for interacting with google youtube api
 */
export default class YoutubeApi {
  config: IOauthConfig;

  constructor(config: IOauthConfig) {
    this.config = config;
  }

  /**
   * Get playlist of authenticated user
   * @param accessToken
   */
  async getMyPlaylists(
    accessToken: string,
    { part, ...options }: IPlaylistsOptions
  ): Promise<IApiCallReturn<IPlaylistsResponse>> {
    try {
      const res = await axios.get(endpoints.playlist, {
        params: { part: part.join(","), ...options },
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return { data: res.data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e?.response?.data?.error?.message || e.message,
      };
    }
  }

  /**
   * Get videos of playlist by playlist id
   * @param playlistId
   * @param accessToken
   */
  async getPlaylistItems(
    playlistId: string,
    accessToken: string,
    { part, ...options }: IPlaylistsOptions
  ): Promise<IApiCallReturn<IPlaylistItemsResponse>> {
    try {
      const params = {
        params: { playlistId, part: part.join(","), ...options },
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const res: AxiosResponse<IPlaylistItemsResponse> = await axios.get(
        endpoints.playlistItem,
        params
      );
      return { data: res.data, error: null };
    } catch (e) {
      return { data: null, error: "Playlist not found" };
    }
  }

  /**
   * Search for a video
   * @param accessToken
   */
  async searchQuery(
    accessToken: string,
    { type, part, ...options }: ISearchOptions
  ): Promise<IApiCallReturn<ISearchResponse>> {
    try {
      // search options
      const params = {
        type: type.join(","),
        part: part.join(","),
        ...options,
      };
      const res = await axios.get(endpoints.search, {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return { data: res.data, error: null };
    } catch (e) {
      return { data: null, error: "Failed to search video" };
    }
  }
}

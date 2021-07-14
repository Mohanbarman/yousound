import axios, { AxiosResponse } from "axios";
import querystring from "querystring";
import { IApiCallReturn, IOauthConfig } from "@packages/types";

import {
  IAccessTokenResponse,
  IUserInfoResponse,
  IRefreshTokenResponse,
} from "../types";
import { createUrl } from "../utils";

const ENDPOINTS = {
  AUTH: "https://accounts.google.com/o/oauth2/v2/auth",
  TOKEN: "https://oauth2.googleapis.com/token",
  GOOGLE_USER_INFO: "https://www.googleapis.com/oauth2/v1/userinfo",
};

/**
 * Core class for managing authorization with google oauth servers
 */
export default class GoogleOauth {
  config: IOauthConfig;

  constructor(config: IOauthConfig) {
    this.config = config;
  }

  /**
   * Google authentication url to consent screen
   */
  authUrl(accessType: string): string {
    const options = {
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      access_type: accessType,
      response_type: "code",
      prompt: "consent",
      scope: this.config.scopes.join(" "),
    };
    const url = createUrl(ENDPOINTS.AUTH, options);
    return url;
  }

  /**
   * Gets refresh token and access token from google oauth servers
   * @param code Authentication code received after user gives consent
   */
  async getToken(code: string): Promise<IApiCallReturn<IAccessTokenResponse>> {
    const options = {
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      grant_type: "authorization_code",
    };
    try {
      const res: AxiosResponse<IAccessTokenResponse> = await axios.post(
        ENDPOINTS.TOKEN,
        querystring.stringify(options)
      );
      return { error: null, data: res.data };
    } catch (e) {
      return { error: e.message, data: null };
    }
  }

  /**
   * Get new access token using refresh token
   * @endpoint https://oauth2.googleapis.com/token
   * @param refreshToken
   */
  async refreshAccessToken(
    refreshToken: string
  ): Promise<IApiCallReturn<IRefreshTokenResponse>> {
    const options = {
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };

    try {
      const res: AxiosResponse<IRefreshTokenResponse> = await axios.post(
        ENDPOINTS.TOKEN,
        querystring.stringify(options)
      );
      return { data: res.data, error: null };
    } catch (e) {
      return { data: e.response.data, error: e.message };
    }
  }

  /**
   * Get google user profile info
   * @param tokenId
   * @param accessToken
   */
  async getUserInfo(
    tokenId: string,
    accessToken: string
  ): Promise<IApiCallReturn<IUserInfoResponse>> {
    try {
      const res = await axios.get(ENDPOINTS.GOOGLE_USER_INFO, {
        params: { alt: "json", access_token: accessToken },
        headers: { Authorization: `Bearer ${tokenId}` },
      });
      return { data: res.data, error: null };
    } catch (e) {
      return {
        data: null,
        error: e.response?.data?.error?.message || e.message,
      };
    }
  }
}

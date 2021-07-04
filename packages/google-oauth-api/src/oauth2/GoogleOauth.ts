import axios from "axios";
import querystring from "querystring";
import { IApiCallReturn } from "@packages/types";

import { IOauthConfig } from "../types/oauth.types";
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
  get authUrl(): string {
    const options = {
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      access_type: "online",
      response_type: "code",
      prompt: "consent",
      scope: this.config.scopes.join(" "),
    };
    const url = createUrl(ENDPOINTS.AUTH, options);
    return url;
  }

  async getToken(code: string): Promise<IApiCallReturn<any>> {
    const options = {
      code,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      redirect_uri: this.config.redirectUri,
      grant_type: "authorization_code",
    };
    try {
      const res = await axios.post(ENDPOINTS.TOKEN, querystring.stringify(options));
      return { error: null, data: res.data };
    } catch (e) {
      return { error: e.message, data: null };
    }
  }
}

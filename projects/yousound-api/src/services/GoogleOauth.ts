import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { GetTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { IOauthConfig } from "../types/oauth.types";

/**
 * This class is responsible to managing authorization
 * with the google oauth api
 */
export default class GoogleOauth {
  config: IOauthConfig;
  oauthclient: OAuth2Client;
  private SCOPES = ["https://www.googleapis.com/auth/youtube.readonly"];

  constructor(config: IOauthConfig) {
    this.config = config;
    this.oauthclient = new google.auth.OAuth2(config);
  }

  /**
   * Generates google authentication url for OAuth
   * @returns url
   */
  getAuthUrl(): string {
    const url = this.oauthclient.generateAuthUrl({ scope: this.SCOPES, access_type: "online" });
    return url;
  }

  /**
   * Requests token from google oauth using authentication code
   * @param code Authentication code got after success auth
   */
  async getToken(code: string): Promise<GetTokenResponse> {
    const token = await this.oauthclient.getToken(code);
    return token;
  }

  /**
   * Sets credentials to oauthclient token retrived from getToken
   * @param token
   */
  setToken(token: GetTokenResponse): void {
    this.oauthclient.credentials = token.tokens;
  }
}

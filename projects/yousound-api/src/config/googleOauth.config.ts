import * as env from "./env";
import { IOauthConfig } from "@packages/types";

const googleOauthConfig: IOauthConfig = {
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  redirectUri: env.REDIRECT_URL,
  scopes: [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ],
};

export default googleOauthConfig;

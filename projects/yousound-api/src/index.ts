import express from "express";
import cookieParser from "cookie-parser";
import { GoogleOauth } from "@packages/google-oauth";
import { YoutubeApi } from "@packages/youtube-api";

import * as env from "./config/env";
import { googleOauthConfig } from "./config";
import { authenticateUser } from "./middlewares/authenticationMiddleware";

import * as AuthControllers from "./controllers/AuthControllers";
import * as OauthControllers from "./controllers/OauthControllers";
import * as UserControllers from "./controllers/UserControllers";
import * as VideoController from "./controllers/VideoControllers";

const app = express();

// shared objects
export const googleOauth = new GoogleOauth(googleOauthConfig);
export const youtubeApi = new YoutubeApi(googleOauthConfig);

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/login", AuthControllers.loginController);
app.get("/oauth/google", OauthControllers.googleAuthorizationController);
app.get("/me", authenticateUser, UserControllers.meController);
app.get("/playlists", authenticateUser, VideoController.getMyPlaylists);

app.listen(env.PORT, () => console.log(`Alive on port ${env.PORT} 🚀`));

import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { GoogleOauth } from "@packages/google-oauth";
import { YoutubeApi } from "@packages/youtube-api";

import * as env from "./config/env";
import { googleOauthConfig, session, createDbConnection } from "./config";
import { authenticateUser, getUser } from "./middlewares";

import * as AuthControllers from "./controllers/AuthControllers";
import * as OauthControllers from "./controllers/OauthControllers";
import * as UserControllers from "./controllers/UserControllers";
import * as VideoController from "./controllers/VideoControllers";
import * as PlaylistController from "./controllers/PlaylistController";

createDbConnection();

const app = express();
// shared objects
export const googleOauth = new GoogleOauth(googleOauthConfig);
export const youtubeApi = new YoutubeApi(googleOauthConfig);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(session);
app.use(helmet()); // adding extra headers for security

// routes
app.get("/login", AuthControllers.loginController);
app.get("/oauth/google", OauthControllers.googleAuthorizationController);
app.get("/me", authenticateUser, UserControllers.meController);
app.get("/playlists", authenticateUser, PlaylistController.getMyPlaylists);
app.get("/video/:id", getUser, VideoController.getAudio);

// starting express server
app.listen(env.PORT, () => console.log(`Alive on port ${env.PORT} 🚀`));

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import expressSession from "express-session";
import MongoSession from "connect-mongodb-session";

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
const mongoSession = MongoSession(expressSession);
const sessionStore = new mongoSession({
  uri: env.MONGO_URI,
  collection: "Sessions",
});

// shared objects
export const googleOauth = new GoogleOauth(googleOauthConfig);
export const youtubeApi = new YoutubeApi(googleOauthConfig);

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
  })
);
app.use(helmet()); // adding extra headers for security

// routes
app.get("/login", AuthControllers.loginController);
app.get("/oauth/google", OauthControllers.googleAuthorizationController);
app.get("/me", authenticateUser, UserControllers.meController);
app.get("/playlists", authenticateUser, UserControllers.getMyPlaylists);
app.get("/video/:id", VideoController.playAudioController);

// starting express server
app.listen(env.PORT, () => console.log(`Alive on port ${env.PORT} 🚀`));

// connecting to mongo database
mongoose
  .connect(env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`Connected to database at ${env.MONGO_URI} 📁`))
  .catch(() =>
    console.log(`Failed to connect to database at ${env.MONGO_URI} ❌`)
  );

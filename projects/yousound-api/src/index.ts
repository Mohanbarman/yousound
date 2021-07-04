import express from "express";
import cookieParser from "cookie-parser";

import YoutubeApi from "./services/YoutubeApi";

import * as env from "./config/env";
import * as AuthControllers from "./controllers/AuthControllers";
import * as OauthControllers from "./controllers/OauthControllers";
import * as UserControllers from "./controllers/UserControllers";
import { authorizationMiddleware } from "./middlewares/authorizationMiddleware";

const app = express();

// shared objects
export const youtubeApi = new YoutubeApi({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  redirectUri: env.REDIRECT_URL,
});

// middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/video/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  res.send(`<h1>${videoId}</h1>`);
});

app.get("/login", AuthControllers.loginController);
app.get("/oauth/google", OauthControllers.googleAuthorizationController);
app.get("/me", authorizationMiddleware, UserControllers.meController);

app.listen(env.PORT, () => console.log(`Alive on port ${env.PORT} 🚀`));

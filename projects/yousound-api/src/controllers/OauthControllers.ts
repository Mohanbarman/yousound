import { Response } from "express";

import { TRequest } from "../types/context.types";
import { UserEntity } from "../entities";
import { googleOauth } from "../app";
import { userHelpers } from "../utils/userHelpers";
import { userErrors } from "../errors";
import { SUCCESS_AUTH_URL } from "../config/env";

/**
 * - Fetches refresh and access token from google oauth api
 * - Saves user info in database
 * @route GET /oauth/google
 */
export const authorizeOauth = async (
  req: TRequest,
  res: Response
): Promise<any> => {
  const authCode = req.query.code;

  // code param not present
  if (typeof authCode !== "string") {
    res.json({ error: "code is required" });
    return;
  }

  // getting oauth token object from google oauth server
  const oauthToken = await googleOauth.getToken(authCode);

  // failed to get oauth access token
  if (oauthToken.error) {
    return res.json(userErrors.codeFailed);
  }

  // getting general user info
  const googleUser = await googleOauth.getUserInfo(
    oauthToken.data.id_token,
    oauthToken.data.access_token
  );

  // checking if user already exists
  const dbUser = await userHelpers.getByEmail(googleUser.data.email);

  // Updating oauth tokens if user already exists
  if (dbUser) {
    dbUser.accessToken = oauthToken.data.access_token;
    dbUser.refreshToken = oauthToken.data.refresh_token;
    dbUser.accessTokenExp = new Date(
      Date.now() + oauthToken.data.expires_in * 1000
    );
    req.session.userID = dbUser.id.toString();
    return res.redirect(SUCCESS_AUTH_URL);
  }

  // creating new user
  const newUser = new UserEntity();

  newUser.name = googleUser.data.name;
  newUser.email = googleUser.data.email;
  newUser.accessToken = oauthToken.data.access_token;
  newUser.refreshToken = oauthToken.data.refresh_token;
  newUser.accessTokenExp = new Date(
    Date.now() + oauthToken.data.expires_in * 1000
  );
  newUser.profilePicture = googleUser.data.picture;

  await userHelpers.save(newUser);

  // setting user id in client session for authentication
  req.session.userID = newUser.id.toString();

  res.redirect(SUCCESS_AUTH_URL);
};

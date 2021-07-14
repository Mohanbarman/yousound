import { Response } from "express";

import { userModel } from "../models/UserModel";
import { TRequest } from "../types/context.types";
import { googleOauth } from "..";

export const googleAuthorizationController = async (
  req: TRequest,
  res: Response
): Promise<void> => {
  const authCode = req.query.code;

  // code param not present
  if (typeof authCode !== "string") {
    res.json({ error: "code is required" });
    return;
  }

  // getting oauth token object from google oauth server
  const oauthToken = await googleOauth.getToken(authCode);

  // getting general user info
  const googleUser = await googleOauth.getUserInfo(
    oauthToken.data.id_token,
    oauthToken.data.access_token
  );

  // checking if user already exists
  const dbUser = await userModel.findOne({ email: googleUser.data.email });

  // Updating oauth tokens if user already exists
  if (dbUser) {
    dbUser.update({
      accessToken: oauthToken.data.access_token,
      refreshToken: oauthToken.data.refresh_token,
      accessTokenExp: new Date(Date.now() + oauthToken.data.expires_in * 1000),
    });
    req.session.userID = dbUser.id;
    return res.redirect("/me");
  }

  // creating new user
  const userDoc = await userModel.create({
    name: googleUser.data.name,
    email: googleUser.data.email,
    accessToken: oauthToken.data.access_token,
    refreshToken: oauthToken.data.refresh_token,
    accessTokenExp: new Date(Date.now() + oauthToken.data.expires_in * 1000),
  });

  req.session.userID = userDoc.id;

  res.redirect("/me");
};

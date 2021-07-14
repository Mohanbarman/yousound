import { NextFunction, Response } from "express";

import { TRequest } from "../types/context.types";
import { userModel } from "../models/UserModel";
import { responseErrors } from "../utils";
import { googleOauth } from "..";

/**
 * Middleware for authenticating user
 * Responsible for:
 * + Validating user's session
 * + Refreshing access token of the user
 * + Sets the user document object in request
 */
export const authenticateUser = async (
  req: TRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const userId = req.session.userID;

  /**
   * userID in session is not present
   */
  if (!userId) {
    return res.json(responseErrors.UNAUTHENTICATED_USER);
  }

  /**
   * Getting user by userId
   */
  const user = await userModel.findById(userId);

  /**
   * There is no user in database with this userId
   */
  if (!user) {
    return res.json(responseErrors.AUTH_USER_NOT_FOUND);
  }

  /**
   * Checking if access token is expired
   */
  if (user.accessTokenExp < new Date()) {
    // getting new access token from google oauth api
    const { data, error } = await googleOauth.refreshAccessToken(
      user.refreshToken
    );

    /**
     * If failes to get new access token then clear the
     * sesssion to get new refresh token when user authenticates again
     */
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      req.session.destroy(() => {}); // Clearing the user's session
      return res.json(responseErrors.OAUTH_ACCESS_TOKEN);
    }

    // updating new access token in database
    user.accessToken = data.access_token;
    user.accessTokenExp = new Date(Date.now() + data.expires_in * 1000);
    await user.save();
  }

  // setting user in req object to be used by next middleware
  req.user = user;
  next();
};

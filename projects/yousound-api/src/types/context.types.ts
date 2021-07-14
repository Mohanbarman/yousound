import { Request } from "express";
import session from "express-session";
import { Document } from "mongoose";
import { IUser } from "./user.types";

type TSessionUser = { userID: string };

export type TRequest = Request & {
  session: session.Session & Partial<session.SessionData> & TSessionUser;
  user: IUser & Document<any, any, IUser>;
};

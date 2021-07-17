import { Request } from "express";
import session from "express-session";
import { UserEntity } from "../entities";

type TSessionUser = { userID: string };

export type TRequest = Request & {
  session: session.Session & Partial<session.SessionData> & TSessionUser;
  user?: UserEntity | null;
};

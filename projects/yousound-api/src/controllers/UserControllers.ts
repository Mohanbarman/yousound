import { Request, Response } from "express";
import { youtubeApi } from "..";

export const meController = (req: Request, res: Response) => {
  const authToken = req.cookies.Authorization;

  if (!authToken) {
    res.redirect("/login");
    return;
  }

  res.send(authToken);
};

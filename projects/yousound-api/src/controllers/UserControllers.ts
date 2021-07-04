import { Request, Response } from "express";

export const meController = (req: Request, res: Response): void => {
  const authToken = req.cookies.Authorization;

  if (!authToken) {
    res.redirect("/login");
    return;
  }

  res.send(authToken);
};

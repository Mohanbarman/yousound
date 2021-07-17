import { Request, Response } from "express";
import { getAudioUrl } from "@packages/youtube-dl";
import { buildResponse } from "../utils";

export const getAudio = async (req: Request, res: Response): Promise<void> => {
  const videoId: string = req.params.id;

  const { data: audioUrl, error: audioUrlErr } = await getAudioUrl(videoId);

  if (audioUrlErr) {
    res.json({ error: audioUrlErr });
    return;
  }

  res.json(buildResponse({ success: true, data: audioUrl }));
};

import { Request, Response } from "express";
import { getAudioUrl } from "@packages/youtube-dl";

export const playAudioController = async (req: Request, res: Response): Promise<void> => {
  const videoId: string = req.params.id;

  const { data: audioUrl, error: audioUrlErr } = await getAudioUrl(videoId);

  if (audioUrlErr) {
    res.sendStatus(500);
    return;
  }

  res.send(`
  <audio controls>
    <source src="${audioUrl}" type="audio/webm">
    Your browser does not support the audio tag.
  </audio>
`);
};

import GoogleOauth from "./GoogleOauth";
import { IOauthConfig } from "../types/oauth.types";
import { google, youtube_v3 } from "googleapis";

export default class YoutubeApi extends GoogleOauth {
  youtubeClient: youtube_v3.Youtube;

  constructor(config: IOauthConfig) {
    super(config);
    this.youtubeClient = google.youtube("v3");
  }

  async getMyPlaylists(): Promise<youtube_v3.Schema$Playlist[] | undefined> {
    const channels = await this.youtubeClient.playlists.list({
      auth: this.oauthclient,
      part: ["id"],
      mine: true,
    });

    return channels.data.items;
  }
}

export interface IPlaylistsOptions {
  part: Array<
    "contentDetails" | "id" | "localizations" | "player" | "snippet" | "status"
  >;
  channelId?: string;
  id?: string;
  mine?: boolean;
}

export interface IPlaylistsResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: IPlaylistItem[];
}

export interface IPlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: IPlaylistSnippet;
  contentDetails: IPlaylistContentDetails;
}

export interface IPlaylistContentDetails {
  itemCount: number;
}

export interface IPlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: IPlaylistLocalized;
}

export interface IPlaylistLocalized {
  title: string;
  description: string;
}

export interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres: Default;
}

export interface Default {
  url: string;
  width: number;
  height: number;
}

export interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

import { TContentPart } from "./common.types";

export interface IPlaylistsItemsOptions {
  part: TContentPart;
  playlistId: string;
  maxResults: number;
}

export interface IPlaylistsOptions {
  part: TContentPart;
  channelId?: string;
  id?: string;
  mine?: boolean;
  maxResults?: number;
  pageToken?: string;
}

export interface IPlaylistsResponse {
  kind: string;
  etag: string;
  pageInfo: PageInfo;
  items: IPlaylistItem[];
}

interface IPlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: IPlaylistSnippet;
  contentDetails: IPlaylistContentDetails;
}

interface IPlaylistContentDetails {
  itemCount: number;
}

interface IPlaylistSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  localized: IPlaylistLocalized;
}

interface IPlaylistLocalized {
  title: string;
  description: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
  standard: Default;
  maxres: Default;
}

interface Default {
  url: string;
  width: number;
  height: number;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

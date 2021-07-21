import { TContentPart } from "./common.types";

type TSearchType = Array<"channel" | "playlist" | "video">;

export interface ISearchOptions {
  q: string;
  maxResults: number;
  part: TContentPart;
  type?: TSearchType;
  pageToken?: string;
}

// Generated by https://quicktype.io

export interface ISearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: PageInfo;
  items: Item[];
}

interface Item {
  kind: string;
  etag: string;
  id: ID;
  snippet: Snippet;
}

interface ID {
  kind: string;
  videoId: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Thumbnails {
  default: Default;
  medium: Default;
  high: Default;
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

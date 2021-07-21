export interface IPlaylistItemsResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: Item[];
  pageInfo: PageInfo;
}

interface Item {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet;
  contentDetails: ContentDetails;
  status: Status;
}

interface ContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: ResourceID;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

interface ResourceID {
  kind: string;
  videoId: string;
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

interface Status {
  privacyStatus: string;
}

interface PageInfo {
  totalResults: number;
  resultsPerPage: number;
}

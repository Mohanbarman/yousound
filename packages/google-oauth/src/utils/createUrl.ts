import querystring from "querystring";

export const createUrl = (rootUrl: string, options: Record<string, string>): string => {
  return `${rootUrl}?${querystring.stringify(options)}`;
};

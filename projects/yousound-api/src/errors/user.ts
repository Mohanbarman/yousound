import { buildResponse } from "../utils";

export const userErrors = {
  unauthenticated: buildResponse({
    success: false,
    error: {
      code: "USER_UNAUTHENTICATED",
      description: "User is not authenticated",
    },
  }),

  newAccessToken: buildResponse({
    success: false,
    error: {
      code: "OAUTH_ACCESS_TOKEN",
      description: "Failed to fetch new access token",
    },
  }),

  codeFailed: buildResponse({
    success: false,
    error: {
      code: "OAUTH_CODE_FAILED",
      description: "Failed to get access token using oauth code",
    },
  }),

  notFound: buildResponse({
    success: false,
    error: {
      code: "USER_NOT_FOUND",
      description: "Session not found",
    },
  }),
};

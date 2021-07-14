import { buildResponse } from ".";

export const responseErrors = {
  UNAUTHENTICATED_USER: buildResponse({
    success: false,
    error: {
      code: "USER_UNAUTHENTICATED",
      description: "User is not authenticated",
    },
  }),
  AUTH_USER_NOT_FOUND: buildResponse({
    success: false,
    error: {
      code: "AUTH_USER_NOT_FOUND",
      description: "User not found",
    },
  }),
  OAUTH_ACCESS_TOKEN: buildResponse({
    success: false,
    error: {
      code: "OAUTH_ACCESS_TOKEN",
      description: "Failed to fetch new access token",
    },
  }),
};

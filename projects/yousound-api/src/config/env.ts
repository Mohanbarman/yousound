import { config } from "dotenv";

config({ path: ".env" });

export const PORT = process.env.PORT || 4000;

// google oauth2 details
export const CLIENT_ID = process.env["CLIENT_ID"] || "";
export const REDIRECT_URL = process.env["REDIRECT_URL"] || "";
export const CLIENT_SECRET = process.env["CLIENT_SECRET"] || "";

// required environment variables
if (!CLIENT_ID) throw new Error("CLIENT_ID is required env");
if (!REDIRECT_URL) throw new Error("REDIRECT_URL is required env");
if (!CLIENT_SECRET) throw new Error("CLIENT_SECRET is required env");

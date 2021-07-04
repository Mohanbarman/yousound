import { config } from "dotenv";

// load env from .env path
config({ path: ".env" });

// server config
export const PORT = process.env.PORT || 4000;

// google oauth2 details
export const CLIENT_ID = process.env["CLIENT_ID"] || "";
export const REDIRECT_URL = process.env["REDIRECT_URL"] || "";
export const CLIENT_SECRET = process.env["CLIENT_SECRET"] || "";

// jwt
export const JWT_ACCESS_TOKEN = process.env["JWT_ACCESS_TOKEN"] || "";

// required environment variables
if (!CLIENT_ID) throw new Error("CLIENT_ID is required env");
if (!REDIRECT_URL) throw new Error("REDIRECT_URL is required env");
if (!CLIENT_SECRET) throw new Error("CLIENT_SECRET is required env");
if (!JWT_ACCESS_TOKEN) throw new Error("JWT_ACCESS_TOKEN is required env");

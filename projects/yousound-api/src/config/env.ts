import { config } from "dotenv";

// load env from .env path
config({ path: ".env" });

// server config
export const PORT = process.env.PORT || 4000;

// environment
export const ENV = process.env["ENV"] || "dev";

// google oauth2 details
export const CLIENT_ID = process.env["CLIENT_ID"] || "";
export const REDIRECT_URL = process.env["REDIRECT_URL"] || "";
export const CLIENT_SECRET = process.env["CLIENT_SECRET"] || "";

// jwt
export const JWT_ACCESS_TOKEN = process.env["JWT_ACCESS_TOKEN"] || "";

// database config
export const MONGO_URI = process.env["MONGO_URI"] || "";

// required environment variables
const envErr = (name: string) => {
  throw new Error(`${name} is required environment variable`);
};

if (!CLIENT_ID) envErr("CLIENT_ID");
if (!REDIRECT_URL) envErr("REDIRECT_URL");
if (!CLIENT_SECRET) envErr("CLIENT_SECRET");
if (!JWT_ACCESS_TOKEN) envErr("JWT_ACCESS_TOKEN");
if (!MONGO_URI) envErr("MONGO_URI");

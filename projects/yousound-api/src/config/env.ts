import { config } from "dotenv";

// load env from .env.prod in production fallback to .env
config({ path: process.env["ENV"] === "production" ? ".env.prod" : ".env" });

// server config
export const PORT = parseInt(process.env["PORT"] || "4000");
export const SESSION_SECRET = process.env["SESSION_SECRET"];

// environment
export const ENV = process.env["ENV"] || "dev";

// google oauth2 details
export const CLIENT_ID = process.env["CLIENT_ID"] || "";
export const REDIRECT_URL = process.env["REDIRECT_URL"] || "";
export const CLIENT_SECRET = process.env["CLIENT_SECRET"] || "";

// jwt
export const JWT_ACCESS_TOKEN = process.env["JWT_ACCESS_TOKEN"] || "";

// database config
export const DB_HOST = process.env["DB_HOST"] || "";
export const DB_PORT = parseInt(process.env["DB_PORT"] || "");
export const DB_USERNAME = process.env["DB_USERNAME"] || "";
export const DB_PASS = process.env["DB_PASS"] || "";
export const DB_NAME = process.env["DB_NAME"] || "";

// required environment variables
const envErr = (name: string) => {
  throw new Error(`${name} is required environment variable`);
};

if (!CLIENT_ID) envErr("CLIENT_ID");
if (!REDIRECT_URL) envErr("REDIRECT_URL");
if (!CLIENT_SECRET) envErr("CLIENT_SECRET");
if (!JWT_ACCESS_TOKEN) envErr("JWT_ACCESS_TOKEN");
if (!DB_HOST) envErr("DB_HOST");
if (!DB_PORT) envErr("DB_PORT");
if (!DB_USERNAME) envErr("DB_USERNAME");
if (!DB_PASS) envErr("DB_PASS");
if (!DB_NAME) envErr("DB_NAME");

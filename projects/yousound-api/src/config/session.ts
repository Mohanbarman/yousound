import expressSession from "express-session";
import PgSession from "connect-pg-simple";
import * as env from "./env";

const sessionStore = PgSession(expressSession);

const pgStore = new sessionStore({
  conObject: {
    host: env.DB_HOST,
    database: env.DB_NAME,
    port: env.DB_PORT,
    password: env.DB_PASS,
    user: env.DB_USERNAME,
  },
  tableName: "session",
});

export const session = expressSession({
  secret: env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: pgStore,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
});

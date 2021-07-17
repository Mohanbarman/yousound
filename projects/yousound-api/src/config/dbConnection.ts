import { createConnection } from "typeorm";
import * as env from "./env";

export const createDbConnection = async (): Promise<void> => {
  try {
    await createConnection({
      type: "postgres",
      host: env.DB_HOST,
      username: env.DB_USERNAME,
      password: env.DB_PASS,
      database: env.DB_NAME,
      synchronize: true,
      logging: false,
      entities: ["src/entities/*.ts"],
    });

    console.log(`Connected to database at ${env.DB_HOST}:${env.DB_PORT} 📁`);
  } catch (e) {
    throw new Error(e);
  }
};

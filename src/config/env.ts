/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import dotenv from "dotenv";

dotenv.config();

type NodeEnv = "development" | "production" | "test";

interface EnvConfig {
  NODE_ENV: NodeEnv;
  PORT: number;
  DATABASE_URL: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
}

const requiredEnv = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is required but not defined.`);
  }
    return value;
};

const loadEnvVariables = (): EnvConfig => {
  return {
    NODE_ENV : (process.env.NODE_ENV as NodeEnv) || "development",
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DATABASE_URL: requiredEnv("DATABASE_URL"),
    BETTER_AUTH_SECRET: requiredEnv("BETTER_AUTH_SECRET"),
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL ?? "https://better-auth.pris.ly",
  };
};

const envConfig = loadEnvVariables();

export default envConfig;

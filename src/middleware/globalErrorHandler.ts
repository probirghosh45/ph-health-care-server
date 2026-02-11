/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import envConfig from "../config/env";
import { error } from "node:console";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("Unhandled error:", err);
  if (envConfig.NODE_ENV === "development") {
    console.log("Error from global error handler", err);
  }
  const statusCode: number = status.INTERNAL_SERVER_ERROR;
  const message: string = "An unexpected error occurred. Please try again later.";

  
  res.status(statusCode).json({
    success: false,
    message: message,
    error : err instanceof Error ? err.message : "Unknown error",
  });
};

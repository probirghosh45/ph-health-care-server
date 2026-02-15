/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import z from "zod";
import AppError from "../app/errorHelpers/AppError";
import { handleZodError } from "../app/errorHelpers/handleZodError";
import {
  IErrorResponse,
  TErrorSources,
} from "../app/interfaces/error.interface";
import envConfig from "../config/env";

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
  // const statusCode: number = status.INTERNAL_SERVER_ERROR;
  // const message: string = "An unexpected error occurred. Please try again later.";

  // res.status(statusCode).json({
  //   success: false,
  //   message: message,
  //   error : err instanceof Error ? err.message : "Unknown error",
  // });

  let errorSources: TErrorSources[] = [];
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let stack: string | undefined = undefined;

  if (err instanceof z.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode as number;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources
      ? [...simplifiedError.errorSources]
      : [];
    stack = err.stack;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message;
    stack = err.stack;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  const errorResponse: IErrorResponse = {
    success: false,
    message: message,
    errorSources,
    error: envConfig.NODE_ENV === "development" ? err : undefined,
    stack: envConfig.NODE_ENV === "development" ? stack : undefined,
    statusCode: 0,
  };

  res.status(statusCode).json(errorResponse);
};

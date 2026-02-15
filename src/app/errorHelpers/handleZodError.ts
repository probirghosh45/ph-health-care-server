import status from "http-status";
import z from "zod";
import { IErrorResponse, TErrorSources } from "../interfaces/error.interface";

export const handleZodError = (error: z.ZodError): IErrorResponse => {
  const statusCode = status.BAD_REQUEST;
  const message = "Validation Error";
  const errorSources: TErrorSources[] = [];

  error.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join("=>"),
      message: issue.message,
    });
  });
  return {
    success: false,
    message: message,
    errorSources: errorSources,
    statusCode: statusCode,
  };
};

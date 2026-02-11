// /* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from "express";
import status from "http-status";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error: any) {
      console.error("Error in catchAsync:", error);
      next(error);
      res.status(status.INTERNAL_SERVER_ERROR).json({ message: "An unexpected error occurred." });
    }
  };
};

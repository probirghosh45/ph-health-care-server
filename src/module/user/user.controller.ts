/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Request, Response } from "express";
import { catchAsync } from "../../app/shared/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import { UserService } from "./user.service";
import status from "http-status";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await UserService.createDoctor(payload);
  sendResponse(res,{
    httpStatusCode : status.CREATED,
    success: true,
    message: "Doctor created successfully",
    data: result
  });
});

export const UserController = {
  createDoctor,
};

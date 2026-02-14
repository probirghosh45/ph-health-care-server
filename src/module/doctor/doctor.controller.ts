// /* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../app/shared/catchAsync";
import { sendResponse } from "../../app/shared/sendResponse";
import { DoctorService } from "./doctor.service";

const getAllDoctors = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await DoctorService.getAllDoctors(payload);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Doctors retrieved successfully",
    data: result,
  });
});

export const DoctorController = {
  getAllDoctors,
};

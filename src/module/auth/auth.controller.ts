/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Request, Response } from "express";
import { catchAsync } from "../../app/shared/catchAsync";
import { AuthService } from "./auth.service";

const registerPatient = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.registerPatient(payload);
  res.status(201).json({
    success: true,
    message: "Patient registered successfully",
    data: result,
  });
});

export const AuthController = {
  registerPatient,
};

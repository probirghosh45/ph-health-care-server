/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response } from "express";
import { prisma } from "../../app/lib/prisma";
import { SpecialtyService } from "./specialty.service";

const createSpecialty = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const result = await SpecialtyService.createSpecialty(payload);

    res.status(201).json({
      success: true,
      message: "specialty created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "failed to create specialty",
      error: error.message,
    });
  }
};

const getAllSpecialty = async (req: Request, res: Response) => {
    try {
      const specialties = await SpecialtyService.getAllSpecialty(req, res);
      res.status(200).json({
        success: true,
        message: "specialties retrieved successfully",
        data: specialties,
      });
    } catch (error:any) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "failed to retrieve specialties",
        error: error.message,
      });
    }
};

const deleteSpecialty = async (req: Request, res: Response) => {
  
};

export const specialtyController = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};

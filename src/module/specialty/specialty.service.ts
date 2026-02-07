/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Request, Response } from "express";
import { prisma } from "../../app/lib/prisma";
import { Specialty } from "../../generated/prisma/client";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });

  return specialty;
};

const getAllSpecialty = async (req: Request, res: Response) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.status(200).json({
      success: true,
      message: "specialties retrieved successfully",
      data: specialties,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "failed to retrieve specialties",
      error: error.message,
    });
  }
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
};

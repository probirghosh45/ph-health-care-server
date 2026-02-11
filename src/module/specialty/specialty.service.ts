/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Request, Response } from "express";
import { prisma } from "../../app/lib/prisma";
import { Specialty } from "../../generated/prisma/client";
import status from "http-status";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
  const specialty = await prisma.specialty.create({
    data: payload,
  });

  return specialty;
};

const getAllSpecialty = async (req: Request, res: Response) => {
  try {
    const specialties = await prisma.specialty.findMany();
    res.status(status.OK).json({
      success: true,
      message: "specialties retrieved successfully",
      data: specialties,
    });
  } catch (error: any) {
    console.log(error);
    res.status(status.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "failed to retrieve specialties",
      error: error.message,
    });
  }
};

const deleteSpecialty = async (id: string) => {
  await prisma.specialty.delete({
    where: {
      id:  id,
    },
  });
};

export const SpecialtyService = {
  createSpecialty,
  getAllSpecialty,
  deleteSpecialty,
};

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import status from "http-status";
import AppError from "../../app/errorHelpers/AppError";
import { prisma } from "../../app/lib/prisma";
import { UserStatus } from "../../generated/prisma/enums";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async (payload?: any) => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      doctorSpecialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      user: true,
      doctorSpecialties: {
        include: {
          specialty: true,
        },
      },
      appointments: {
        include: {
          patient: true,
          schedule: true,
          prescription: true,
        },
      },
      doctorSchedules: {
        include: {
          schedule: true,
        },
      },
      reviews: true,
    },
  });
  return doctor;
};

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: {
      id,
    },
  });

  if (!isDoctorExist) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  await prisma.$transaction(async (tx) => {
    if (payload) {
      const { specialties, ...doctorPayload } = payload;
      
      // Flatten the payload to match Prisma's DoctorUpdateInput type
      const doctorData = doctorPayload.doctor || doctorPayload;
      
      if (doctorData && Object.keys(doctorData).length > 0) {
        await tx.doctor.update({
          where: {
            id,
          },
          data: doctorData as any,
        });
      }

      if (specialties && specialties.length > 0) {
        for (const specialty of specialties) {
          const { specialtyId, shouldDelete } = specialty;
          if (shouldDelete) {
            await tx.doctorSpecialty.deleteMany({
              where: {
                doctorId: id,
                specialtyId,
              },
            });
          } else {
            const existingSpecialty = await tx.doctorSpecialty.findFirst({
              where: {
                doctorId: id,
                specialtyId,
              },
            });

            if (!existingSpecialty) {
              await tx.doctorSpecialty.create({
                data: {
                  doctorId: id,
                  specialtyId,
                },
              });
            }
          }
        }
      }
    }
  });

  const doctor = await getDoctorById(id);

  return doctor;
};

//soft delete
const deleteDoctor = async (id: string) => {
  const isDoctorExist = await prisma.doctor.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!isDoctorExist) {
    throw new AppError(status.NOT_FOUND, "Doctor not found");
  }

  await prisma.$transaction(async (tx) => {
    await tx.doctor.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    await tx.user.update({
      where: { id: isDoctorExist.userId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: UserStatus.DELETED, // Optional: you may also want to block the user
      },
    });

    await tx.session.deleteMany({
      where: { userId: isDoctorExist.userId },
    });

    await tx.doctorSpecialty.deleteMany({
      where: { doctorId: id },
    });
  });

  return { message: "Doctor deleted successfully" };
};

export const DoctorService = { 
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};

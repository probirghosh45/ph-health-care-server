/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-confusing-void-expression */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { auth } from "../../app/lib/auth";
import { prisma } from "../../app/lib/prisma";
import { Role, Specialty } from "../../generated/prisma/client";
import { ICreateDoctorPayload } from "./user.interface";

const createDoctor = async (payload: ICreateDoctorPayload) => {
  const specialties: Specialty[] = [];

  // ✅ Check specialties
  for (const specialtyId of payload.specialties) {
    const specialty = await prisma.specialty.findUnique({
      where: { id: specialtyId },
    });

    if (!specialty) {
      throw new Error(`Specialty with id ${specialtyId} not found`);
    }

    specialties.push(specialty);
  }

  // ✅ Check existing user
  const userExists = await prisma.user.findUnique({
    where: { email: payload.doctor.email },
  });

  if (userExists) {
    throw new Error(`User with email ${payload.doctor.email} already exists`);
  }

  // ✅ Create auth user
  const userData = await auth.api.signUpEmail({
    body: {
      email: payload.doctor.email,
      password: payload.password,
      name: payload.doctor.name,
      role: Role.DOCTOR,
      deletedAt: new Date(0),
    },
  });

  try {
    const result = await prisma.$transaction(async (tx) => {
      // ✅ Create doctor
      const createdDoctor = await tx.doctor.create({
        data: {
          userId: userData.user.id,
          ...payload.doctor,
          gender: payload.doctor.gender as any,
        },
      });

      // ✅ Map specialties
      const doctorSpecialtiesData = specialties.map((specialty) => ({
        doctorId: createdDoctor.id,
        specialtyId: specialty.id,
      }));

      await tx.doctorSpecialty.createMany({
        data: doctorSpecialtiesData,
      });

      // ✅ Fetch final doctor with relations
      const doctorWithRelations = await tx.doctor.findUnique({
        where: { id: createdDoctor.id },
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          contactNumber: true,
          address: true,
          registrationNumber: true,
          experienceYears: true,
          designation: true,
          doctorSpecialties: {
            select: {
              specialty: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
      });

      return doctorWithRelations;
    });

    return result;
  } catch (error) {
    console.error("Error creating doctor:", error);

    await prisma.user.delete({
      where: {
        id: userData.user.id,
      },
    });

    throw new Error("Failed to create doctor");
  }
};

export const UserService = {
  createDoctor,
};


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { prisma } from "../../app/lib/prisma";

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

export const DoctorService = { getAllDoctors };

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable no-console */

import { auth } from "../../app/lib/auth";
import { prisma } from "../../app/lib/prisma";
import { UserStatus } from "../../generated/prisma/enums";

interface RegisterPatientPayload {
  email: string;
  name: string;
  password: string;
}

const registerPatient = async (payload: RegisterPatientPayload) => {
  if (!payload) throw new Error("Payload is missing");

  const { email, name, password } = payload;

  if (!email || !name || !password) {
    throw new Error("Email, name and password are required");
  }

  const data = await auth.api.signUpEmail({
    body: {
      email,
      name,
      password,
      deletedAt: null as any,
    },
  });

  if (!data.user) {
    throw new Error("User registration failed");
  }
};

interface LoginPatientPayload {
  name?: string;
  email: string;
  password: string;
}

const loginPatient = async (payload: LoginPatientPayload) => {
  if (!payload) throw new Error("Payload is missing");
  const { email, password } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }
  const data = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (!data.user) {
    throw new Error("Invalid email or password");
  }

  if (data.user.status === UserStatus.BLOCKED) {
    throw new Error("Your account is blocked. Please contact support.");
  }

  if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
    throw new Error("Your account is deleted. Please contact support.");
  }

  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name || data.user.name || "Patient",
          email: payload.email,
        },
      });

      return patientTx;
    });

    return {
      ...data,
      patient,
    };
  } catch (error) {
    console.error("Error during patient login transaction:", error);
    await prisma.patient.deleteMany({
      where: { userId: data.user.id },
    });

    throw new Error(
      "An error occurred while logging in. Please try again later.",
    );
  }
};

export const AuthService = {
  registerPatient,
  loginPatient,
};

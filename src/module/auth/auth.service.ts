/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable no-console */

import { auth } from "../../app/lib/auth";
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

  return data;
};

//  create patient profile after sign up in user model

export const AuthService = {
  registerPatient,
  loginPatient,
};

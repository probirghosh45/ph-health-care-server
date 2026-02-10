/* eslint-disable curly */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable no-console */

import { auth } from "../../app/lib/auth";

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

  // console.log("Registering patient with payload:", payload);

  // const { email, name, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      email,
      name,
      password,
      //   role: Role.PATIENT,  [default value is already set in auth.ts]
    },
  });

  if (!data.user) {
    throw new Error("User registration failed");
  }
};

//  create patient profile after sign up in user model

export const AuthService = {
  registerPatient,
};

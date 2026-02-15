import z from "zod";
import { Gender } from "../../generated/prisma/enums";

export const createDoctorZodSchema = z.object({
  password : z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be less than 30 characters long"),   
  doctor: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters long")
      .max(20, "Name must be less than 20 characters long"),
    email: z.email("Invalid email format"),
    profilePhoto: z.string().optional(),
    contactNumber: z
      .string()
      .min(11, "Contact number must be at least 11 digits long")
      .max(14, "Contact number must be at most 14 digits long"),
    address: z
      .string()
      .min(5, "Address must be at least 5 characters long")
      .max(100, "Address must be less than 100 characters long"),
    registrationNumber: z
      .string()
      .min(5, "Registration number must be at least 5 characters long")
      .max(20, "Registration number must be less than 20 characters long"),
    experienceYears: z
      .number()
      .nonnegative("Experience years must be a non-negative number")
      .optional(),
    gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHER]),
    appointmentFee: z
      .number()
      .min(0, "Appointment fee must be a positive number"),
    qualifications: z
      .string()
      .min(5, "Qualifications must be at least 5 characters long")
      .max(200, "Qualifications must be less than 200 characters long"),
    currentWorkingPlace: z
      .string()
      .min(3, "Current working place must be at least 3 characters long")
      .max(100, "Current working place must be less than 100 characters long"),
    designation: z
      .string()
      .min(3, "Designation must be at least 3 characters long")
      .max(50, "Designation must be less than 50 characters long"),
  }),

  specialties: z.array(
    z
      .uuid("Invalid specialty ID format")
      .min(1, "At least one specialty must be provided"),
  ),
});
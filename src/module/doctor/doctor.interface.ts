export interface IUpdateDoctorPayload {
  id: string;
  name: string;
  email: string;
  profilePhoto?: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experienceYears: number;
  gender: string; // enum
  appointmentFee: number;
  qualifications: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

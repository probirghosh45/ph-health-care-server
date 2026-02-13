// model Doctor {
//     id                  String    @id @default(uuid())
//     name                String
//     email               String    @unique
//     profilePhoto        String?
//     contactNumber       String
//     address             String
//     registrationNumber  String
//     experienceYears     Int
//     gender              Gender
//     appointmentFee      Float
//     qualifications      String
//     currentWorkingPlace String
//     designation         String
//     isDeleted           Boolean   @default(false)
//     deletedAt           DateTime?
//     createdAt           DateTime  @default(now())
//     updatedAt           DateTime  @updatedAt


//     // relations
//     userId              String  @unique
//     user                User      @relation(fields: [userId], references: [id], onDelete: Cascade)

//     @@index([email], name: "doctor_email_index")
//     @@index([isDeleted, deletedAt], name: "doctor_deletion_index")
//     @@map("doctor")  
//     doctorSpecialties DoctorSpecialty[]
// }


export interface ICreateDoctorPayload {
    password: string;
    doctor: {
        name: string;
        email: string;
        profilePhoto?: string;
        contactNumber: string;
        address: string;
        registrationNumber: string;
        experienceYears: number;
        gender: string;
        appointmentFee: number;
        qualifications: string;
        currentWorkingPlace: string;
        designation: string;
        
    },
    specialties: string[];
}
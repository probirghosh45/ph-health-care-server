/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prisma } from "../../app/lib/prisma"

const createSpecialty = async(payload: any) =>{
   const specialty = await prisma.specialty.create({
    data : payload
   })

   return specialty
}



export const SpecialtyService = {
    createSpecialty
}
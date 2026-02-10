/* eslint-disable @typescript-eslint/no-unnecessary-template-expression */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client";
import envConfig from '../../config/env';


const connectionString = `${envConfig.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma };
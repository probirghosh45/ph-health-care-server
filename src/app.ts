/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";

const app: Application = express();


// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1", IndexRoutes);

// Basic route
app.get('/', async (req: Request, res: Response) => {

    const specialty = await prisma.specialty.create({
        data: {
            title: 'Cardiology 2'
        }
    })
    res.status(201).json({
        success: true,
        message: 'API is working',
        data: specialty
    })
});

export default app;




























// import express, { type Application } from "express";
// import { prisma } from "./shared/prisma.js";

// const app: Application = express();

// app.get("/", async (req, res) => {
//   const email = "pk@gmail.com";

//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!existingUser) {
//     await prisma.user.create({
//       data: {
//         email,
//         name: "PK",
//       },
//     });
//   }

//   //   await prisma.user.create({
//   //     data: {
//   //       name: "PK",
//   //       email: "pk@example.com"
//   //     },
//   //   });
//   res.send("Welcome to PH Health Care Backed API");
// });
// export default app;

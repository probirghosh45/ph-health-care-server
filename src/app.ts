import express, { type Application } from "express";
import { prisma } from "./shared/prisma.js";

const app: Application = express();

app.get("/", async (req, res) => {
  const email = "pk@gmail.com";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        email,
        name: "PK",
      },
    });
  }

  //   await prisma.user.create({
  //     data: {
  //       name: "PK",
  //       email: "pk@example.com"
  //     },
  //   });
  res.send("Welcome to PH Health Care Backed API");
});
export default app;

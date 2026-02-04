import express, { type Application } from "express";
import { prisma } from "./shared/prisma.js";

const app: Application = express();

app.get("/",(req,res)=>{
    await prisma.user.findMany()
    res.send("Welcome to PH Health Care Backed API")
})
export default app;

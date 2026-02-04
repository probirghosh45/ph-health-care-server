import express, { type Application } from "express";

const app: Application = express();

app.get("/",(req,res)=>{
    res.send("Welcome to PH Health Care Backed API")
})
export default app;

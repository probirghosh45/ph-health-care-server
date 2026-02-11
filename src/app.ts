/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import notFound from "./middleware/notFound";

const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to PH Health Care Backed API");
});

app.use(globalErrorHandler);
app.use(notFound);



export default app;

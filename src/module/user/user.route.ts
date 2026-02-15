import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { UserController } from "./user.controller";
import { createDoctorZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/create-doctor",
  validateRequest(createDoctorZodSchema),
  UserController.createDoctor,
);

export const UserRoutes = router;




//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("before zod validation",req.body)
//     const parseResult = createDoctorZodSchema.safeParse(req.body);
//     if (!parseResult.success) {
//       console.log("Zod Error", parseResult.error);
//       next(parseResult.error);
//     }
//     // sanitized data is available in parseResult.data
//     req.body = parseResult.data;
//     console.log("after zod validation", req.body);
//     next();
//   },

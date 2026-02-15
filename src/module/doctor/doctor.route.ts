import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router = Router();
router.get("/", DoctorController.getAllDoctors);

// do it yourself
// router.get("/:id", DoctorController.getAllDoctorsById);
// router.get("/:id", DoctorController.updateDoctor);
// router.get("/:id", DoctorController.deleteDoctor);

    
export const DoctorRoutes = router;

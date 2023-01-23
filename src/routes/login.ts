import { Router } from "express";
import controllers from "../controllers/login";

const router = Router();

router.post("/login", controllers.loginController);
router.post("/register", controllers.registerController);
router.post("/update-details", controllers.updateDetailsController);

export default router;

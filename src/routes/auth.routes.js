import { Router } from "express";
import { signup, login, logout, profile, update } from "../controllers/auth.controller.js";
import { validatePhoto } from "../middlewares/validatePhoto.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validateToken } from "../middlewares/validateToken.js";
import { multerUpload } from "../middlewares/multer.js";

const router = Router();

router.post("/signup", validatePhoto, validateSchema(registerSchema), signup);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/profile", validateToken, profile);
router.put("/update", validateToken, multerUpload.single('photo'), validatePhoto, update);

export default router;

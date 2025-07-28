import express from "express";
//* import controllers
import { AuthController } from "../controllers/auth.controller";


const router = express.Router();

// AUTH ROUTES
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export default router
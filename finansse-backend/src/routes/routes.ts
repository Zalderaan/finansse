import express from "express";
//* import controllers
import { AuthController } from "../controllers/auth.controller";
import { authenticateToken } from "../utils/auth.middleware";


const router = express.Router();

// AUTH ROUTES
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// protected API routes
router.get('/auth/me', authenticateToken, AuthController.getMe);
router.post('/auth/logout', authenticateToken, AuthController.logout);
router.post('/auth/refresh', AuthController.refresh); // no route protection here for now (the access token itself is expired)


export default router;
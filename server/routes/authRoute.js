import express from "express";
import { validateUserCreateParams, validateUserLoginParams } from "../middleware/authMiddleware";
import { createUser, loginUser } from "../controller/authController";

const router = express.Router();

router.post('/signup', validateUserCreateParams, createUser)
router.post('/login', validateUserLoginParams, loginUser)

export default router;
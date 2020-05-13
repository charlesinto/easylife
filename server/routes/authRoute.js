import express from "express";
import { validateUserCreateParams } from "../middleware/authMiddleware";
import { createUser } from "../controller/authController";

const router = express.Router();

router.post('/signup', validateUserCreateParams, createUser)

export default router;
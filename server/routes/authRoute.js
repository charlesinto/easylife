import express from "express";
import { validateUserCreateParams, validateUserLoginParams } from "../middleware/authMiddleware";
import { createUser, loginUser, getUserProfile } from "../controller/authController";
import { verifyTokenMiddleWare } from "../util/helper";

const router = express.Router();

router.post('/signup', validateUserCreateParams, createUser)
router.post('/login', validateUserLoginParams, loginUser)
router.get('/profile', verifyTokenMiddleWare, getUserProfile )

export default router;
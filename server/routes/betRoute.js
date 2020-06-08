import express from 'express';
import { verifyTokenMiddleWare } from '../util/helper';
import { getUserWalletBalance } from '../controller/betController';

const router = express.Router();


router.get('/user/wallet-balance', verifyTokenMiddleWare, getUserWalletBalance )

export default router;
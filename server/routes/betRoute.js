import express from 'express';
import { verifyTokenMiddleWare } from '../util/helper';
import { getUserWalletBalance, getUserWalletHistory, topUpWallet } from '../controller/betController';
import { verifyTopUpParams } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/user/wallet-balance', verifyTokenMiddleWare, getUserWalletBalance )

router.get('/user/wallet-history', verifyTokenMiddleWare, getUserWalletHistory)

router.post('/user/wallet-topup', verifyTokenMiddleWare, verifyTopUpParams, topUpWallet)

export default router;
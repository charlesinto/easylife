import express from 'express';
import { verifyTokenMiddleWare } from '../util/helper';
import { getUserWalletBalance, getUserWalletHistory } from '../controller/betController';

const router = express.Router();


router.get('/user/wallet-balance', verifyTokenMiddleWare, getUserWalletBalance )

router.get('/user/wallet-history', verifyTokenMiddleWare, getUserWalletHistory)

export default router;
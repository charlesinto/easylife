import express from 'express';
import { verifyTokenMiddleWare } from '../util/helper';
import { getUserWalletBalance, getUserWalletHistory, topUpWallet, getTransactionBetweenDate, playGame, getAllUserGames, getBetStakes } from '../controller/betController';
import { verifyTopUpParams, transactionReportParams, verifyGameSchema } from '../middleware/authMiddleware';

const router = express.Router();


router.get('/user/wallet-balance', verifyTokenMiddleWare, getUserWalletBalance )

router.get('/user/wallet-history', verifyTokenMiddleWare, getUserWalletHistory)

router.post('/user/wallet-topup', verifyTokenMiddleWare, verifyTopUpParams, topUpWallet)

router.post('/user/transaction-report',verifyTokenMiddleWare, transactionReportParams, getTransactionBetweenDate)

router.post('/play-game', verifyTokenMiddleWare, verifyGameSchema, playGame)

router.get('/get-all-games', verifyTokenMiddleWare, getAllUserGames)

router.get('/game/:id/stakes', verifyTokenMiddleWare, getBetStakes)

export default router;
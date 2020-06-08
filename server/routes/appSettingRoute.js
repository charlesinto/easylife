
import express from 'express';
import { getBetController } from '../controller/betController';


const router = express.Router();


router.get('/get-catgeories', getBetController);

export default router;
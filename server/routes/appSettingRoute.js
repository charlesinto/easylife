
import express from 'express';
import { getBetController, getBetCategoryById } from '../controller/betController';


const router = express.Router();


router.get('/get-catgeories', getBetController);

router.get('/get-category/:id', getBetCategoryById)

export default router;
import express from 'express';
import * as contrShop from '../controllers/shop';

const router = express.Router();

router.get( '/', contrShop.getAllCars );

export default router;
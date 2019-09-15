import express from 'express';
import * as contrShop from '../controllers/shop';

const router = express.Router();

router.get( '/',               contrShop.getAllCars      );
router.get( '/select-fav/:id', contrShop.getCarSelectFav );

export default router;
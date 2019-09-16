import express from 'express';
import * as contrShop from '../controllers/shop';

const router = express.Router();

router.get( '/',               contrShop.getCarsAll      );
router.get( '/select-fav/:id', contrShop.getCarSelectFav );

router.get( '/favorites',      contrShop.getCarsSelected );

export default router;
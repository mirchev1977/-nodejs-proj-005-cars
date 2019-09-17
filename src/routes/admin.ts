import express from 'express';
import * as contrAdmin from '../controllers/admin';

const router = express.Router();

router.get(  '/admin',     contrAdmin.getCarsAll   );
router.get(  '/admin/new', contrAdmin.getCarsNew   );
router.post( '/admin/new', contrAdmin.postCarsNew  );

export default router;
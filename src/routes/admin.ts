import express from 'express';
import * as contrAdmin from '../controllers/admin';

const router = express.Router();

router.get(  '/admin',            contrAdmin.getCarsAll    );
router.get(  '/admin/new',        contrAdmin.getCarsNew    );
router.post( '/admin/new',        contrAdmin.postCarsNew   );
router.get(  '/admin/delete/:id', contrAdmin.getCarDelete  );
router.get(  '/admin/edit/:id',   contrAdmin.getCarsEdit   );
router.post( '/admin/edit',       contrAdmin.postCarsEdit  );

export default router;
import express from 'express';
import * as contrAdmin from '../controllers/admin';
import * as templ from  '../entities/templates';

const router = express.Router();

router.get(  '/admin',            contrAdmin.getCarsAll    );
router.get(  '/admin/new',        contrAdmin.getCarsNew    );
router.post( '/admin/new',        contrAdmin.postCarsNew   );
router.get(  '/admin/delete/:id', contrAdmin.getCarDelete  );
router.get(  '/admin/edit/:id',   contrAdmin.getCarsEdit   );
router.post( '/admin/edit',       contrAdmin.postCarsEdit  );

router.get( '/admin/restore',    ( req, res, next )  => {
    templ.seedCar()
    res.write( 'restore' );
    res.send();
} );

export default router;
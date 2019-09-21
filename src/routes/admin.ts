import express from 'express';
import * as contrAdmin from '../controllers/admin';
import * as templ from  '../entities/templates';

const router = express.Router();

router.get(  '',            contrAdmin.getCarsAll    );
router.get(  '/new',        contrAdmin.getCarsNew    );
router.post( '/new',        contrAdmin.postCarsNew   );
router.get(  '/delete/:id', contrAdmin.getCarDelete  );
router.get(  '/edit/:id',   contrAdmin.getCarsEdit   );
router.post( '/edit',       contrAdmin.postCarsEdit  );

router.get( '/restore',    ( req, res, next )  => {
    templ.seedCar()
    res.write( 'restore' );
    res.send();
} );

export default router;
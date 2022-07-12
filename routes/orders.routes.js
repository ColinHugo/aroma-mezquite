const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const {
    getOrders,
    postOrder
} = require( '../controllers/orders.controller' );


router.get( '/:idUsuario/:estado', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    validateJWT,
    validatePermission.sameUser,
    validateFields
], getOrders );

router.post( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    validateJWT,
    validatePermission.sameUser,
    validateFields
], postOrder );

module.exports = router;
const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const {
    getOrders,
    getOrdersById,
    postOrder
} = require( '../controllers/orders.controller' );

router.get( '/:estado', [
    validateJWT,
    validatePermission.isAdmin,
    validateFields
], getOrders );

router.get( '/:idUsuario/:estado', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    validateFields
], getOrdersById );

router.post( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    validateFields
], postOrder );

module.exports = router;
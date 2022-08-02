const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    setDates,
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const { dbValidators } = require( '../helpers');

const {
    getOrders,
    getOrdersById,
    getOrdersByDate,
    postOrder,
    cancelOrder
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

router.get( '/:estado/:desde/:hasta', [
    validateJWT,
    validatePermission.isAdmin,
    setDates,
    validateFields
], getOrdersByDate );

router.post( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    validateFields
], postOrder );

router.put( '/:idUsuario/:idPedido', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idPedido', 'No es un id válido' ).isMongoId(),
    check( 'idPedido' ).custom( dbValidators.orderExists ),
    validateFields
], cancelOrder );

module.exports = router;
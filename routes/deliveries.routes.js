const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require( '../middlewares' );

const { dbValidators } = require( '../helpers');

const {
    getDeliveries,
    postDeliveries,
    putDeliveries
} = require( '../controllers/deliveries.controller' );

router.get( '/:idUsuario', [
    validateJWT,
    check( 'idUsuario',  'No es un id válido.' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    validatePermission.sameUser,
    validateFields
], getDeliveries );

router.post( '/:idRepartidor/:idOrden/:idCliente', [
    validateJWT,
    check( 'idRepartidor',  'No es un id válido.' ).isMongoId(),
    check( 'idRepartidor' ).custom( dbValidators.userExists ),
    check( 'idOrden',  'No es un id válido.' ).isMongoId(),
    check( 'idOrden' ).custom( dbValidators.orderExists ),
    check( 'idCliente',  'No es un id válido.' ).isMongoId(),
    validateFields
], postDeliveries );

router.put( '/:idEntrega/:idOrden', [
    validateJWT,
    check( 'idOrden',  'No es un id válido.' ).isMongoId(),
    check( 'idOrden' ).custom( dbValidators.orderExists ),
    validateFields
], putDeliveries );

module.exports = router;
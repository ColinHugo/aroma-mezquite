const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const { dbValidators } = require( '../helpers' );

const {
    getTables,
    postTable,
    putTable,
    deleteTable
} = require( '../controllers/tables.controller' );

router.get( '/', validateJWT, getTables );

router.post( '/', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'mesa', 'El número de la mesa es obligatorio.' ).escape().trim().notEmpty(),
    check( 'mesa', 'Ingrese un número válido.' ).isFloat( { min: 1 } ).isInt(),
    check( 'precio', 'El precio de la mesa es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida.' ).isFloat( { min: 0 } ),
    validateFields
], postTable );

router.put( '/:idMesa', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idMesa', 'No es un id válido.' ).isMongoId(),
    check( 'idMesa' ).custom( dbValidators.tableExists ),
    check( 'mesa', 'El número de la mesa es obligatorio.' ).escape().trim().notEmpty(),
    check( 'mesa', 'Ingrese un número válido.' ).isFloat( { min: 1 } ).isInt(),
    check( 'precio', 'El precio de la mesa es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida.' ).isFloat( { min: 0 } ),
    validateFields
], putTable );

router.delete( '/:idMesa', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idMesa', 'No es un id válido.' ).isMongoId(),
    check( 'idMesa' ).custom( dbValidators.tableExists ),
    validateFields
], deleteTable );

module.exports = router;
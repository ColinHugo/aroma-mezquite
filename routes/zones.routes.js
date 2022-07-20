const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const { dbValidators } = require( '../helpers' );

const {
    getZones,
    postZone,
    putZone,
    deleteZone
} = require( '../controllers/zones.controller' );

router.get( '/', validateJWT, getZones );

router.post( '/', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'zona', 'El nombre de la zona es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la zona es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida.' ).isFloat( { min: 0 } ),
    validateFields
], postZone );

router.put( '/:idZona', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idZona', 'No es un id válido.' ).isMongoId(),
    check( 'idZona' ).custom( dbValidators.zoneExists ),
    check( 'zona', 'El nombre de la zona es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'El precio de la zona es obligatorio.' ).escape().trim().notEmpty(),
    check( 'precio', 'Ingrese una cantidad válida.' ).isFloat( { min: 0 } ),
    validateFields
], putZone );

router.delete( '/:idZona', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idZona', 'No es un id válido.' ).isMongoId(),
    check( 'idZona' ).custom( dbValidators.zoneExists ),
    validateFields
], deleteZone );

module.exports = router;
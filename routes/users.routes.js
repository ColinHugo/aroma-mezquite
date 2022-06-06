const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    limiters,
    validateFields,
    validateJWT,
    validatePermission
} = require( '../middlewares' );

const { dbValidators } = require( '../helpers');

const {
    getUser,
    getUsers,
    postUser,
    putUser,
    deleteUser
} = require( '../controllers/users.controller' );

router.get( '/', [
    validateJWT,
    validatePermission.getRole
], getUsers );

router.get( '/:idUsuario', [
    check( 'idUsuario', 'No es un id válido.' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    validateFields
], getUser );

router.post( '/', [
    limiters.limiterAccount,
    check( 'nombre', 'Ingrese un nombre válido.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'apellidos', 'Ingrese apellidos válidos.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().isNumeric().isLength( { min: 10, max: 10 } ),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( dbValidators.emailExists ),
    check( 'password', 'El password debe tener al menos 5 caracteres.' ).escape().trim().isLength( { min: 5 } ),
    validateFields
], postUser );

router.put( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    check( 'nombre', 'Ingrese un nombre válido.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'apellidos', 'Ingrese apellidos válidos.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().isNumeric().isLength( { min: 10, max: 10 } ),
    validateFields
], putUser );

router.delete( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario' ).custom( dbValidators.userExists ),
], deleteUser );

module.exports = router;
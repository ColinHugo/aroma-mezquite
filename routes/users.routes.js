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
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().isMobilePhone( 'es-MX' ),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( dbValidators.emailExists ),
    check( 'password', 'El password debe tener al menos 5 caracteres.' ).escape().trim().isLength( { min: 5 } ),
    check( 'repetirPassword', 'Las contraseñas no coinciden.' ).custom( ( value, { req } ) => value === req.body.password ),
    validateFields
], postUser );

router.put( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    check( 'nombre', 'Ingrese un nombre válido.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'apellidos', 'Ingrese apellidos válidos.' ).escape().trim().matches( /^[A-Za-z\s\u00C0-\u017F]+$/ ),
    check( 'correo', 'Ingrese un correo válido.' ).escape().trim().isEmail(),
    check( 'correo' ).custom( validatePermission.changeEmail ),
    check( 'telefono', 'Ingrese un número telefónico válido.' ).trim().isMobilePhone( 'es-MX' ),
    check( 'direccion.calle', 'El nombre de la calle es obligatoria.' ).escape().trim().notEmpty(),
    check( 'direccion.referencia', 'Ingrese una referencia.' ).escape().trim().notEmpty(),
    check( 'direccion.codigoPostal', 'Ingrese un código postal válido.' ).trim().isPostalCode( 'MX' ),
    check( 'direccion.colonia', 'El nombre de la colonia es obligatoria.' ).escape().trim().notEmpty(),
    validateFields
], putUser );

router.delete( '/:idUsuario', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario' ).custom( dbValidators.userExists ),
], deleteUser );

module.exports = router;
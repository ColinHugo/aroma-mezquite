const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validateFields } = require( '../middlewares' );

const login = require( '../controllers/auth.controller' );

router.post( '/login', [
    check( 'correo', 'Ingrese un correo válido' ).escape().trim().isEmail(),
    check( 'password', 'La contraseña es obligatoria' ).escape().trim().notEmpty(),
    validateFields
], login );

module.exports = router;
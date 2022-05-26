const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const { validarCampos } = require( '../middlewares' );

const googleSignIn = require( '../controllers/auth.controller' );

router.post( '/login', [
    check( 'id_token', 'El token es necesario.' ).escape().trim().notEmpty(),
    validarCampos
], googleSignIn );

module.exports = router;
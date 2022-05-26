const { validationResult } = require( 'express-validator' );

function validarCampos( req, res, next ) {

    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status( 400 ).json( {
            value: 0,
            errors
        } );
    }
    
    next();
}

module.exports = validarCampos;
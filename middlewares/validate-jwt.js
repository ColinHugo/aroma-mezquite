const jwt = require( 'jsonwebtoken' );

const { Usuario } = require( '../models' );

async function validarJWT( req, res, next ) {

    const token = req.header( 'x-token' );

    if( !token ){
        return res.status( 401 ).json( {
            value: 0,
            msg: 'No hay token en la petición.',
        } );
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        const usuario = await Usuario.findById( uid );

        if( !usuario || !usuario.estado ){
            return res.status( 401 ).json( {
                value: 0,
                msg: 'Token no válido.',
            } );
        }

        req.body.usuario = usuario;

        next();

    } catch ( error ) {

        console.error( 'Error al validar el token.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al validar el token.'
        } );
    }
};

module.exports = validarJWT;
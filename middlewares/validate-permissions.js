const { User } = require( '../models' );

async function changeEmail( correo, { req } ) {

    const { usuario } = req;

    if ( usuario.correo !== correo ) {
        
        const user = await User.findOne( { correo } );
    
        if ( user ) {
            throw new Error( 'No se pudo actualizar el correo.' );
        }
    }
}

function getRole( req, res, next ) {

    if( !req.usuario ){
        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al verificar el usuario.',
        } );
    }

    const { rol } = req.usuario;

    if( rol !== 1 ){
        return res.status( 403 ).json( {
            value: 0,
            msg: 'Acceso denegado.'
        } );
    }

    next();
}

function sameUser( req, res, next ) {
    
    if( !req.usuario ){
        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al verificar el usuario.',
        } );
    }

    const { id } = req.usuario;
    const { idUsuario } = req.params;

    if ( id !== idUsuario ) {
        return res.status( 400 ).json( {
            value: 0,
            msg: 'Acción no permitida.'
        } );
    }

    next();
}

module.exports = {
    changeEmail,
    getRole,
    sameUser
};
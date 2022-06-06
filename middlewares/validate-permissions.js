function getRole( req, res, next ) {

    if( !req.body.usuario ){
        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al verificar el usuario.',
        } );
    }

    const { rol } = req.body.usuario;

    if( rol !== 1 ){
        return res.status( 403 ).json( {
            value: 0,
            msg: 'Acceso denegado.'
        } );
    }

    next();
}

function sameUser( req, res, next ) {
    
    if( !req.body.usuario ){
        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al verificar el usuario.',
        } );
    }

    const { id } = req.body.usuario;
    const { idUsuario } = req.params;

    if ( id !== idUsuario ) {
        return res.status( 400 ).json( {
            value: 0,
            msg: 'Acción no permitida.'
        } )
    }

    next();
}

module.exports = {
    getRole,
    sameUser
};
const models = require( '../models' );

async function emailExists( correo ) {
    
    const email = await models.User.findOne( { correo } );

    if ( email ) {
        throw new Error( 'Correo ya registrado.' );
    }
}

async function userExists( id ) {
    
    const user = await models.User.findById( id );

    if ( !user || !user.estado ) {
        throw new Error( 'No existe usuario.' );
    }
}

module.exports = {
    emailExists,
    userExists
}
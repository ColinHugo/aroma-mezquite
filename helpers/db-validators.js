const models = require( '../models' );

async function emailExists( correo ) {
    
    const email = await models.User.findOne( { correo } );

    if ( email ) {
        throw new Error( 'Correo ya registrado.' );
    }
}

async function productExists( id ) {
    
    const producto = await models.Product.findById( id );

    if ( !producto ) {
        throw new Error( 'No existe producto.' );
    }
}

async function tableExists( id ) {
    
    const mesa = await models.Table.findById( id );

    if ( !mesa ) {
        throw new Error( 'No existe mesa.' );
    }
}

async function userExists( id ) {
    
    const user = await models.User.findById( id );

    if ( !user || !user.estado ) {
        throw new Error( 'No existe usuario.' );
    }
}

async function zoneExists( id ) {
    
    const zona = await models.Zone.findById( id );

    if ( !zona ) {
        throw new Error( 'No existe zona.' );
    }
}

module.exports = {
    emailExists,
    productExists,
    tableExists,
    userExists,
    zoneExists
}
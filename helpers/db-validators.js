const models = require( '../models' );

async function emailExists( correo ) {
    
    const email = await models.User.findOne( { correo } );

    if ( email ) {
        throw new Error( 'Correo ya registrado.' );
    }
}

async function orderExists( id ) {
    
    const orden = await models.Order.findById( id );

    if ( !orden ) {
        throw new Error( 'No existe orden.' );
    }
}

async function productExists( id ) {
    
    const producto = await models.Product.findById( id );

    if ( !producto ) {
        throw new Error( 'No existe producto.' );
    }
}

async function reservationTableExists( id ) {
    
    const reservacion = await models.ReservationTable.findById( id );

    if ( !reservacion ) {
        throw new Error( 'No existe reservacion.' );
    }
}

async function reservationZoneExists( id ) {
    
    const reservacion = await models.ReservationZone.findById( id );

    if ( !reservacion ) {
        throw new Error( 'No existe reservacion.' );
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
    orderExists,
    productExists,
    reservationTableExists,
    reservationZoneExists,
    tableExists,
    userExists,
    zoneExists
}
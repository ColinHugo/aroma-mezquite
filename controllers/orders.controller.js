const { Order } = require( '../models' );

async function getOrders( req, res ) {

    const { idUsuario, estado } = req.params;

    try {

        const ordenes = await Order.where( {
            usuario: idUsuario,
            estado
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'direccion' ] )
            .populate( 'orden.idProducto', [ 'nombre', 'precio', 'cantidad', 'foto' ] );

        if ( ordenes.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay ordenes registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            ordenes
        } );
    }

    catch ( error ) {

        console.error( 'Error al obtener las productos.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las ordenes.'
        } );
    }
}

async function postOrder( req, res ) {

    try {

        const orden = new Order( req.body );

        await orden.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la orden.'
        } );
    }
}

module.exports = {
    getOrders,
    postOrder
}
const { Order } = require( '../models' );

async function getOrders( req, res ) {

    const { estado } = req.params;

    try {

        const ordenes = await Order.where( { estado } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'direccion', 'tokenPush' ] )
            .populate( 'orden.idProducto', [ 'nombre', 'precio', 'cantidad', 'foto', 'estado' ] )
            .sort( {
                updatedAt: -1
            } );

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

        console.error( 'Error al obtener las ordenes.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las ordenes.'
        } );
    }
}

async function getOrdersById( req, res ) {

    const { idUsuario, estado } = req.params;

    try {

        const ordenes = await Order.where( {
            usuario: idUsuario,
            estado
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'direccion', 'tokenPush' ] )
            .populate( 'orden.idProducto', [ 'nombre', 'precio', 'cantidad', 'foto', 'estado' ] );

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

        console.error( 'Error al obtener las ordenes.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las ordenes.'
        } );
    }
}

async function getOrdersByDate( req, res ) {

    const { estado, desde, hasta } = req.params;

    try {

        const ordenes = await Order.where( {
            estado,
            $and: [ {
                createdAt: {
                    $gte: new Date( desde ).toISOString(),
                    $lte: new Date( hasta ).toISOString()
                }
            } ]
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'direccion', 'tokenPush' ] )
            .populate( 'orden.idProducto', [ 'nombre', 'precio', 'cantidad', 'foto', 'estado' ] );

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

        console.error( 'Error al obtener las ordenes.', error );

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

async function acceptOrder( req, res ) {

    const { idPedido } = req.params;

    try {

        await Order.findByIdAndUpdate( idPedido, { estado: 'en curso' } );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se ha aceptado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al aceptar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al aceptar la orden.'
        } );
    }
}

async function conludeOrder( req, res ) {

    const { idPedido } = req.params;

    try {

        await Order.findByIdAndUpdate( idPedido, { estado: 'completado' } );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se ha completado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al completar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al completar la orden.'
        } );
    }
}

async function cancelOrder( req, res ) {

    const { idPedido } = req.params;

    try {

        await Order.findByIdAndUpdate( idPedido, { estado: 'cancelado' } );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se ha cancelado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al cancelar la orden.'
        } );
    }
}

module.exports = {
    getOrders,
    getOrdersById,
    getOrdersByDate,
    postOrder,
    acceptOrder,
    conludeOrder,
    cancelOrder
}
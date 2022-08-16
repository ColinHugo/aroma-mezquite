const { Delivery, Order } = require( '../models' );

async function getDeliveries( req, res ) {

    const { idUsuario } = req.params;
    
    try {
        
        const entregas = await Delivery.find( {
            repartidor: idUsuario
        } )
            .populate( 'repartidor', [ 'nombre', 'apellidos' ] )
            .populate( {
                path: 'orden',
                model: 'Order',
                populate: {
                    path: 'orden.idProducto',
                    select: 'nombre',
                    model: 'Product'
                }
            })
            .populate( 'cliente', [ 'nombre', 'apellidos', 'telefono', 'direccion', 'tokenPush' ] );

        if ( entregas.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay entregas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            entregas
        } );

    } catch ( error ) {

        console.error( 'Error al obtener las entregas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las entregas.'
        } );
    }
}

async function postDeliveries( req, res ) {

    const { idRepartidor, idOrden, idCliente } = req.params;
    
    try {
        
        const entregas = new Delivery( {
            repartidor: idRepartidor,
            orden: idOrden,
            cliente: idCliente
        } );

        await Promise.all( [
            entregas.save(),
            Order.findByIdAndUpdate( idOrden, { estado: 'en curso' } )
        ] );

        res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se asignó correctamente.'
        } );

    } catch ( error ) {

        console.error( 'Error al guardar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al guardar la orden.'
        } );
    }
}

async function putDeliveries( req, res ) {

    const { idEntrega, idOrden } = req.params;
    
    try {

        await Promise.all( [
            Order.findByIdAndUpdate( idOrden, { estado: 'completado' } ),
            Delivery.findByIdAndUpdate( idEntrega, { estado: 'completado' } )
        ] );
        
        

        res.status( 201 ).json( {
            value: 1,
            msg: 'La orden se actualizó correctamente.'
        } );

    } catch ( error ) {

        console.error( 'Error al actualizar la orden.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la orden.'
        } );
    }
}

module.exports = {
    getDeliveries,
    postDeliveries,
    putDeliveries
}
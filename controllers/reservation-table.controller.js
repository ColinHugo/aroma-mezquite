const { ReservationTable } = require( '../models' );

async function getReservationsTable( req, res ) {

    const { desde } = req.params;

    try {

        const reservaciones = await ReservationTable.find( {
            fechaInicio: {
                $gte: new Date( desde ).toISOString(),
                $lte: new Date( desde + 86399999 ).toISOString()
            }
        } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'tokenPush' ] )
            .populate( 'mesa', [ 'mesa', 'precio' ] )

        if ( reservaciones.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay reservaciones registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            reservaciones
        } );
    }

    catch ( error ) {

        console.error( 'Error al obtener las reservaciones.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las reservaciones.'
        } );
    }
}

async function getReservationTable( req, res ) {

    const { idUsuario } = req.params;

    try {

        const reservaciones = await ReservationTable.find( { usuario: idUsuario } )
            .populate( 'usuario', [ 'nombre', 'apellidos', 'tokenPush' ] )
            .populate( 'mesa', [ 'mesa', 'precio' ] )

        if ( reservaciones.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'El usuario no tiene reservaciones registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            reservaciones
        } );
    }

    catch ( error ) {

        console.error( 'Error al obtener las reservaciones del usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las reservaciones del usuario.'
        } );
    }
}

async function postReservationTable( req, res ) {

    req.body.usuario = req.usuario;
    req.body.mesa = req.params.idMesa;

    try {

        const reservacion = new ReservationTable( req.body );

        await reservacion.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La reservación se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la reservación.'
        } );
    }
}

async function putReservationTable( req, res ) {

    const { idReservacion } = req.params;

    try {

        await ReservationZone.findByIdAndUpdate( idReservacion, req.body );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La reservación se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la reservación.'
        } );
    }
}

async function deleteReservationTable( req, res ) {

    const { idReservacion } = req.params;

    try {

        await ReservationTable.findByIdAndRemove( idReservacion );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La reservación se ha eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la reservación.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la reservación.'
        } );
    }
}

module.exports = {
    getReservationsTable,
    getReservationTable,
    postReservationTable,
    putReservationTable,
    deleteReservationTable
}
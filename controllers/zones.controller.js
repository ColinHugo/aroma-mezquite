const { Zone } = require( '../models' );

async function getZones( req, res ) {

    try {

        const zonas = await Zone.find();

        if ( zonas.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay zonas registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            zonas
        } );
    }

    catch ( error ) {

        console.error( 'Error al obtener las zonas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las zonas.'
        } );
    }
}

async function postZone( req, res ) {

    try {

        const zona = new Zone( req.body );

        await zona.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La zona se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la zona.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la zona.'
        } );
    }
}

async function putZone( req, res ) {

    const { idZona } = req.params;

    try {

        const zona = await Zone.findByIdAndUpdate( idZona, req.body );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La zona se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la zona.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la zona.'
        } );
    }
}

async function deleteZone( req, res ) {

    const { idZona } = req.params;

    try {

        const zona = await Zone.findByIdAndRemove( idZona );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La zona se ha eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la zona.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la zona.'
        } );
    }
}

module.exports = {
    getZones,
    postZone,
    putZone,
    deleteZone
}
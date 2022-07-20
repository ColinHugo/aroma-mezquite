const { Table } = require( '../models' );

async function getTables( req, res ) {

    try {

        const mesas = await Table.find();

        if ( mesas.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay mesas registradas.'
            } );
        }

        return res.status( 200 ).json( {
            value: 1,
            mesas
        } );
    }

    catch ( error ) {

        console.error( 'Error al obtener las mesas.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener las mesas.'
        } );
    }
}

async function postTable( req, res ) {

    try {

        const mesa = new Table( req.body );

        await mesa.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La mesa se ha registrado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar la mesa.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar la mesa.'
        } );
    }
}

async function putTable( req, res ) {

    const { idMesa } = req.params;

    try {

        const mesa = await Table.findByIdAndUpdate( idMesa, req.body );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La mesa se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar la mesa.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar la mesa.'
        } );
    }
}

async function deleteTable( req, res ) {

    const { idMesa } = req.params;

    try {

        const mesa = await Table.findByIdAndRemove( idMesa );

        return res.status( 201 ).json( {
            value: 1,
            msg: 'La mesa se ha eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar la mesa.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar la mesa.'
        } );
    }
}

module.exports = {
    getTables,
    postTable,
    putTable,
    deleteTable
}
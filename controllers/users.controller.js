const fs = require( 'fs' );
const path = require( 'path' );

const { User } = require( '../models' );

const {
    generateUrlPhotos,
    uploadFile
} = require( '../helpers' );

async function getUser( req, res ) {

    const { idUsuario } = req.params;

    try {

        let usuario = await User.findById( idUsuario )
            .populate( 'favoritos', [ 'nombre', 'descripcion', 'precio', 'foto', 'estado' ] );

        usuario = generateUrlPhotos( req, 'usuarios', usuario );

        return res.status( 200 ).json( {
            value: 1,
            usuario
        } );
        
    } catch ( error ) {

        console.error( `Error al obtener el usuario con id ${ idUsuario }` );

        return res.status( 500 ).json( {
            value: 0,
            msg: `Error al obtener el usuario con id ${ idUsuario }`
        } );
    }
}

async function getDealers( req, res ) {

    const query = { estado: true, rol: 1 };

    try {

        let usuarios = await User.find( query );

        if ( usuarios.length === 0 ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay usuarios registrados.'
            } );
        }

        usuarios = generateUrlPhotos( req, 'usuarios', usuarios );

        return res.status( 200 ).json( {
            value: 1,
            usuarios
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener a los usuarios.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener a los usuarios.'
        } );
    }
}

async function getTokens( req, res ) {

    try {

        const usuarios = await User.find( { rol: 2 } );

        if ( usuarios.length === 0 ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay usuarios con tokens registrados.'
            } );
        }

        const tokens = usuarios.map( usuario => {
            return usuario.tokenPush;
        } );

        return res.status( 200 ).json( {
            value: 1,
            tokens
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los tokens.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los tokens.'
        } );
    }
}

async function postUser( req, res ) {

    try {

        const usuario = new User( req.body );

        await usuario.save();

        return res.status( 201 ).json( {
            value: 1,
            msg: 'El usuario se ha registrado correctamente.',
        } );
        
    } catch ( error ) {

        console.error( 'Error al registrar al usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al registrar al usuario.'
        } );
    }
}

async function putUser( req, res ) {

    const { idUsuario } = req.params;
    const { password, foto, ...datos } = req.body;

    try {

        const usuario = await User.findById( idUsuario );

        if ( password ) {
            datos.password = await User.encryptPassword( password );
        }

        if ( foto ) {
            if ( usuario.foto ) {
                const pathImagen = path.join( __dirname, '../uploads/usuarios/', usuario.foto );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }

            datos.foto = await uploadFile( req.body.foto, undefined, 'usuarios' );
        }

        await usuario.updateOne( datos );

        return res.status( 200 ).json( {
            value: 1,
            msg: 'El usuario se ha actualizado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el usuario.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el usuario.'
        } );
    }
}

const deleteUsuarios = async ( req, res ) => {

    const { idUsuario } = req.params;

    try {

        const usuario = await User.findById( idUsuario );

        if ( usuario.foto ) {
            
            const pathImagen = path.join( __dirname, '../uploads/usuarios/', usuario.foto );

            if ( fs.existsSync( pathImagen ) ){
                fs.unlinkSync( pathImagen );
            }
        }

        usuario.estado = false;
        usuario.foto = '';

        await usuario.save();

        return res.json( {
            value: 1,
            msg: 'El usuario se ha eliminado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al borrar al usuario.', error );

        return res.json( {
            value: 0,
            msg: 'Error al borrar al usuario.'
        } );
    }
}

async function addFavorites( req, res ) {

    const { id } = req.usuario;
    const { idProducto } = req.params;

    try {

        const usuario = await User.findById( id );

        const { favoritos } = usuario;

        if ( !favoritos.includes( idProducto ) ) {

            await usuario.updateOne( {
                $push: {
                    favoritos: idProducto
                }
            } );

            return res.status( 200 ).json( {
                value: 1,
                msg: 'Se ha agregado a favoritos.'
            } );
        } 
        
        else {

            await usuario.updateOne( {
                $pull: {
                    favoritos: idProducto
                }
            } );

            return res.status( 200 ).json( {
                value: 1,
                msg: 'Se ha eliminado de favoritos.'
            } );
        }

    } catch ( error ) {

        console.error( 'Error al agregar a favoritos.', error )

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al agregar a favoritos.'
        } );
    }
}

module.exports = {
    getUser,
    getDealers,
    getTokens,
    postUser,
    putUser,
    deleteUsuarios,
    addFavorites
}
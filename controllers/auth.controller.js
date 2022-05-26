const { Usuario } = require( '../models' );

const {
    generarJWT,
    googleVerify
} = require('../helpers');

async function googleSignIn( req, res ) {

    const { id_token } = req.body;

    try {

        const { nombre, apellidos, foto, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne( { correo } );

        if( !usuario ){
            
            const data = {
                nombre,
                apellidos,
                correo,
                foto
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        if ( usuario && usuario.foto !== foto ) {
            usuario.foto = foto;
            await usuario.save();
        }

        const token = await generarJWT( usuario.id );
    
        return res.status( 200 ).json( {
            value: 1,
            usuario,
            token
        } );

    } catch ( error ) {

        console.error( 'El token no se pudo verificar.', error );

        return res.status( 400 ).json( {
            value: 0,
            msg: 'El token no se pudo verificar.',
        } );
    }
};

module.exports = googleSignIn;
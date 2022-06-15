const { User } = require( '../models' );

const { generateJWT, generateUrlPhotos } = require( '../helpers' );

async function login( req, res ) {

    const { correo, password } = req.body;

    try {

        let usuario = await User.findOne( { correo } );
    
        const passwordCorrect = ( usuario === null || !usuario.estado ) ? 
        false : await usuario.comparePassword( password );
    
        if ( !passwordCorrect ) {
            return res.status( 400 ).json( {
                value: 0,
                msg: 'Usuario o Password incorrectos',
            } );
        }
    
        const token = await generateJWT( usuario.id );

        usuario = generateUrlPhotos( req, 'usuarios', usuario );
    
        return res.json( {
            value: 1,
            usuario,
            token
        } );

    } catch ( error ) {

        console.error( 'Error al inicar sesión', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al inicar sesión',
        } );
    }
}

module.exports = login;
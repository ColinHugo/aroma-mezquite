const path = require( 'path' );
const fs = require( 'fs' );

const { v4: uuidv4 } = require('uuid');

function subirFoto( dataURI, extensionesValidas = [ 'png', 'jpg', 'jpeg', 'webp' ], carpeta ) {

    return new Promise( ( resolve, reject ) => {

        const extension = dataURI.split( ';' )[ 0 ].split( '/' )[ 1 ];

        if ( !extensionesValidas.includes( extension ) ) {
            return reject( `Extensión ${ extension } no válida, extensiones válidas ${ extensionesValidas }` );
        }

        const posicion = dataURI.indexOf( ',' ) + 1;

        const base64Data = dataURI.slice( posicion );
        const binaryData = new Buffer.from( base64Data, 'base64' ).toString( 'binary' );

        const nombre = uuidv4() + '.' + extension;
        const carpetaContenedora = path.join( __dirname, '../uploads/', carpeta );

        if ( !fs.existsSync( carpetaContenedora ) ) {
            fs.mkdirSync( carpetaContenedora );
        }

        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombre );

        fs.writeFile( uploadPath, binaryData, 'binary', ( err ) => {

            if( err ){ 
                console.error( 'Error al mover la imagen.', err );
                return reject( 'Error al mover la imagen.' );
            }

            resolve( nombre );
        } );
    } );
}

module.exports = subirFoto;
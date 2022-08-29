const mongoose = require( 'mongoose' );

async function dbConnection() {

    try {

        mongoose.connect( process.env.MONGODB_PRO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );

        console.log( 'Base de datos online' );
    }

    catch ( error ) {
        console.error( 'Error al conectar a la base de datos:', error );
        throw new Error( 'Error a la hora de iniciar la base de datos' );
    }
}

module.exports = dbConnection;
const path = require( 'path' );
const express = require( 'express' );
const cors = require( 'cors' );
const mongoSanitize = require( 'express-mongo-sanitize' );

const dbConnection = require( './database/config' );

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( express.json( { limit: '100mb' } ) );
        this.app.use( mongoSanitize() );
        this.app.use( express.static( path.join( __dirname, '/uploads'  ) ) );
        this.app.use( express.static( path.join( __dirname, '/assets'  ) ) );
    }

    routes(){
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;
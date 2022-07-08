const path = require( 'path' );
const express = require( 'express' );
const cors = require( 'cors' );
const helmet = require( 'helmet' );
const mongoSanitize = require( 'express-mongo-sanitize' );

const dbConnection = require( './database/config' );

class Server{

    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/auth',
            products: '/products',
            users: '/users'
        };

        this.conectarDB();

        this.middlewares();

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use( cors() );
        this.app.use( helmet( {
            crossOriginResourcePolicy: false
        } ) );
        this.app.use( express.json( { limit: '100mb' } ) );
        this.app.use( mongoSanitize() );
        this.app.use( express.static( path.join( __dirname, '/uploads'  ) ) );
        this.app.use( express.static( path.join( __dirname, '/assets'  ) ) );
        this.app.use( express.static( path.join( 'public' ) ) );
    }

    routes(){
        this.app.use( this.paths.auth, require( './routes/auth.routes' ) );
        this.app.use( this.paths.products, require( './routes/products.routes' ) );
        this.app.use( this.paths.users, require( './routes/users.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;
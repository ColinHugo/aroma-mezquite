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
            deliveries: '/deliveries',
            orders: '/orders',
            products: '/products',
            reservations: '/reservations',
            tables: '/tables',
            users: '/users',
            zones: '/zones'
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
        this.app.use( this.paths.deliveries, require( './routes/deliveries.routes' ) );
        this.app.use( this.paths.orders, require( './routes/orders.routes' ) );
        this.app.use( this.paths.products, require( './routes/products.routes' ) );
        this.app.use( this.paths.reservations, require( './routes/reservations.routes' ) );
        this.app.use( this.paths.tables, require( './routes/tables.routes' ) );
        this.app.use( this.paths.users, require( './routes/users.routes' ) );
        this.app.use( this.paths.zones, require( './routes/zones.routes' ) );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'Servidor corriendo en el puerto:', this.port );
        } );
    }
}

module.exports = Server;
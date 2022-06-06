const rateLimit = require( 'express-rate-limit' );

const limiterLogin = rateLimit( {
	windowMs: 15 * 60 * 1000,
	max: 5,
	standardHeaders: false,
	legacyHeaders: false,
    message: 'Demasiados intentos fallidos. Por favor, espere 15 minutos y vuelva a intentarlo.'
} );

const limiterAccount = rateLimit( {
	windowMs: 60 * 60 * 1000,
	max: 3,
	standardHeaders: false,
	legacyHeaders: false,
    message: 'Intentaste crear demasiadas cuentas. Por favor, intente en una hora.'
} );

module.exports = {
    limiterLogin,
    limiterAccount
}
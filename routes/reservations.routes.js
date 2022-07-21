const router = require( 'express' ).Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require('../middlewares');

const { dbValidators } = require( '../helpers' );

const {
    getReservationZone,
    getReservationsZone,
    postReservationZone,
    putReservationZone,
    deleteReservationZone
} = require( '../controllers/reservation-zone.controller' );

// ********************************************************
//                  RESERVACIONES POR ZONA
// ********************************************************

router.get( '/zones', validateJWT, getReservationsZone );

router.get( '/zones/:idUsuario', [
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    validateFields,
], getReservationZone );

router.post( '/zones/:idUsuario/:idZona', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idUsuario', 'No es un id válido' ).isMongoId(),
    check( 'idUsuario' ).custom( dbValidators.userExists ),
    check( 'idZona', 'No es un id válido' ).isMongoId(),
    check( 'idZona' ).custom( dbValidators.zoneExists ),
    check( 'numeroAdultos', 'Ingrese una cantidad de adultos válida.' ).escape().trim().isFloat( { min: 1 } ).isInt(),
    check( 'numeroNinos', 'Ingrese una cantidad de niños válida.' ).escape().trim().isFloat( { min: 0 } ).isInt(),
    check( 'fechaInicio', 'La fecha de inicial es obligatoria.').trim().notEmpty(),
    check( 'fechaInicio', 'Ingrese una fecha válida.').isISO8601( { strict: true } ).toDate( 'fechaInicio' ),
    check( 'fechaInicio', 'Ingrese una fecha u hora posterior a la actual.' ).isAfter(),
    check( 'contacto', 'El contacto es obligatorio.' ).escape().trim().notEmpty().isMobilePhone(),
    validateFields
], postReservationZone );

router.put( '/zones/:idUsuario/:idReservacion', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idReservacion', 'No es un id válido' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.reservationZoneExists ),
    check( 'numeroAdultos', 'Ingrese una cantidad de adultos válida.' ).escape().trim().isFloat( { min: 1 } ).isInt(),
    check( 'numeroNinos', 'Ingrese una cantidad de niños válida.' ).escape().trim().isFloat( { min: 0 } ).isInt(),
    check( 'fechaInicio', 'La fecha de inicial es obligatoria.').trim().notEmpty(),
    check( 'fechaInicio', 'Ingrese una fecha válida.').isISO8601( { strict: true } ).toDate( 'fechaInicio' ),
    check( 'fechaInicio', 'Ingrese una fecha u hora posterior a la actual.' ).isAfter(),
    check( 'contacto', 'El contacto es obligatorio.' ).escape().trim().notEmpty().isMobilePhone(),
    validateFields
], putReservationZone );

router.delete( '/zones/:idUsuario/:idReservacion', [
    validateJWT,
    validatePermission.sameUser,
    check( 'idReservacion', 'No es un id válido' ).isMongoId(),
    check( 'idReservacion' ).custom( dbValidators.reservationZoneExists ),
    validateFields
], deleteReservationZone );

module.exports = router;
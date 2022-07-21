const { Schema, model } = require( 'mongoose' );

const reservationZoneSchema = new Schema( {

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    zona: {
        type: Schema.Types.ObjectId,
        ref: 'Zone'
    },

    numeroNinos: {
        type: Number,
        default: 0
    },

    numeroAdultos: {
        type: Number,
        default: 1
    },

    fechaInicio: {
        type: Date,
        required: [ true, 'La hora de inicio de la reservación es obligatoria.' ],
        trim: true
    },

    contacto: {
        type: String,
        required: [ true, 'El número de contacto es obligatorio' ]
    }

}, {
    versionKey: false,
    timestamps: true
} );

reservationZoneSchema.methods.toJSON = function () {

    const { _id, ...reservacionMesa } = this.toObject();
    reservacionMesa.idReservacion = _id;

    return reservacionMesa;
}

module.exports = model( 'reservation-zone', reservationZoneSchema );
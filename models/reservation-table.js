const { Schema, model } = require( 'mongoose' );

const reservationTableSchema = new Schema( {

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    mesa: {
        type: Schema.Types.ObjectId,
        ref: 'Table'
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

reservationTableSchema.methods.toJSON = function () {

    const { _id, ...reservacionMesa } = this.toObject();
    reservacionMesa.idReservacion = _id;

    return reservacionMesa;
}

module.exports = model( 'reservation-table', reservationTableSchema );
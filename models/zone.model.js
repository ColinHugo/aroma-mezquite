const { Schema, model } = require( 'mongoose' );

const zoneSchema = new Schema( {

    zona: {
        type: String,
        required: [ true, 'La zona es obligatoria.' ],
        trim: true
    },

    precio: {
        type: Number,
        required: [ true, 'El precio es obligatorio.' ],
        trim: true
    },

    disponible: {
        type: Boolean,
        default: true
    }

}, {
    versionKey: false
}  );

zoneSchema.methods.toJSON = function () {
    const { _id, ...zona } = this.toObject();
    zona.idZona = _id;
    return zona;
}

module.exports = model( 'Zone', zoneSchema );
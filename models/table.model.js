const { Schema, model } = require( 'mongoose' );

const tableSchema = new Schema( {

    mesa: {
        type: Number,
        required: [ true, 'El número de mesa es obligatorio.' ],
        trim: true
    },

    precio: {
        type: Number,
        required: [ true, 'El precio es obligatorio.' ],
        trim: true
    },

    estado: {
        type: Boolean,
        default: true
    }

}, {
    versionKey: false
}  );

tableSchema.methods.toJSON = function () {
    const { _id, ...mesa } = this.toObject();
    mesa.idMesa = _id;
    return mesa;
}

module.exports = model( 'Table', tableSchema );
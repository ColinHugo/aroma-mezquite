const { Schema, model } = require( 'mongoose' );

const productSchema = new Schema( {

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    descripcion: {
        type: String,
        required: true,
        trim: true
    },

    precio: {
        type: Number,
        required: true,
        trim: true
    },

    foto: {
        type: String,
        trim: true
    }

}, {
    versionKey: false
}  );

productSchema.methods.toJSON = function () {
    const { _id, ...producto } = this.toObject();
    producto.idProducto = _id;
    return producto;
}

module.exports = model( 'Product', productSchema );
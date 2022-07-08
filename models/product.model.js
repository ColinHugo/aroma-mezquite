const { Schema, model } = require( 'mongoose' );

const productSchema = new Schema( {

    nombre: {
        type: String,
        required: [ true, 'El nombre del producto es obligatorio.' ],
        trim: true
    },

    descripcion: {
        type: String,
        required: [ true, 'La descripción del producto es obligatoria.' ],
        trim: true
    },

    precio: {
        type: Number,
        required: [ true, 'El precio del producto es obligatorio.' ],
        trim: true
    },

    foto: {
        type: String,
        trim: true
    },

    categorias: [ {
        type: String,
        required: [ true, 'Al menos una categoria es obligatoria.' ],
        trim: true
    } ]

}, {
    versionKey: false
}  );

productSchema.methods.toJSON = function () {
    const { _id, ...producto } = this.toObject();
    producto.idProducto = _id;
    return producto;
}

module.exports = model( 'Product', productSchema );
const { Schema, model } = require( 'mongoose' );

const orderSchema = new Schema( {

    estado: {
        type: String,
        default: 'pendiente'
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    orden: [ {

        idProducto: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },

        precio: {
            type: Number
        },

        cantidad: {
            type: Number
        },

        total: {
            type: Number
        },

        _id: false
    } ],

    total: {
        type: Number
    },

    formaPago: {
        type: String
    }

}, {
    versionKey: false,
    timestamps: true
}  );

orderSchema.pre( 'save', function () {

    const { orden } = this;
     
    orden.forEach( platillo => {
        platillo.total = platillo.precio * platillo.cantidad;
    } );
} );

orderSchema.methods.toJSON = function(){
    const { _id, ...orden } = this.toObject();
    orden.idOrde = _id;

    return orden;
}

module.exports = model( 'Order', orderSchema );
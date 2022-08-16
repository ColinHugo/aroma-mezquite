const { Schema, model } = require( 'mongoose' );

const deliverySchema = new Schema( {

    estado: {
        type: String,
        default: 'en curso'
    },

    repartidor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    orden: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },

    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    versionKey: false,
    timestamps: true
} );

deliverySchema.methods.toJSON = function(){
    const { _id, ...entrega } = this.toObject();
    entrega.idEntrega = _id;

    return entrega;
}

module.exports = model( 'Delivery', deliverySchema );
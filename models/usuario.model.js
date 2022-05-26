const { Schema, model } = require( 'mongoose' );

const usuarioSchema = new Schema( {

    estado: {
        type: Boolean,        
        default: true
    },

    nombre: {
        type: String,
        required: true,
        trim: true
    },

    apellidos: {
        type: String,
        required: true,
        trim: true
    },

    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    direcciones: [ {
        type: String,
        required: true,
        trim: true
    } ],

    foto: {
        type: String,
        trim: true
    },

    rol: {
        type: Number,
        default: 3,
        trim: true
    },

    favoritos: [ {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        trim: true
    } ]

}, {
    versionKey: false
} );

usuarioSchema.methods.toJSON = function () {
    const { _id, estado, password, ...usuario } = this.toObject();
    usuario.idUsuario = _id;
    return usuario;
}

module.exports = model( 'Usuario', usuarioSchema );
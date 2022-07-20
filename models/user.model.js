const { Schema, model } = require( 'mongoose' );
const bcrypt = require( 'bcrypt' );

const userSchema = new Schema( {

    estado: {
        type: Boolean,        
        default: true
    },

    nombre: {
        type: String,
        required: [ true, 'El nombre es obligatorio' ],
        trim: true
    },

    apellidos: {
        type: String,
        required: [ true, 'Los apellidos son obligatorios' ],
        trim: true
    },

    correo: {
        type: String,
        required: [ true, 'El correo es obligatorio' ],
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ],
    },

    direccion: {

        calle: {
            type: String,
            trim: true
        },

        entreCalles: {
            type: String,
            trim: true
        },

        referencia: {
            type: String,
            trim: true
        },

        codigoPostal: {
            type: String,
            trim: true
        },

        colonia: {
            type: String,
            trim: true
        }
        
    },

    telefono: {
        type: String,
        trim: true
    },

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
        ref: 'Product',
        trim: true
    } ],

    tokenPush: {
        type: String,
        trim: true
    }

}, {
    versionKey: false
} );

userSchema.pre( 'save', async function ( next ){

    if ( !this.isModified( 'password' ) ) {
        next();
    }

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash( this.password, salt );
} );

userSchema.statics.encryptPassword = async ( password ) => {
    const salt = await bcrypt.genSalt();
    return bcrypt.hashSync( password, salt );
}

userSchema.methods.comparePassword = async function ( password ) {
    return await bcrypt.compare( password, this.password );
}

userSchema.methods.toJSON = function () {
    const { _id, estado, password, ...usuario } = this.toObject();
    usuario.idUsuario = _id;
    return usuario;
}

module.exports = model( 'User', userSchema );
const fs = require( 'fs' );
const path = require( 'path' );

const { Product } = require( '../models' );

const {
    generateUrlPhotos,
    pagination,
    uploadFile
} = require('../helpers');

async function getProducts( req, res ) {

    // const { skip, limit } = pagination( req.query );
    const { show } = req.query;
    let favoritos = [];

    try {

        if ( req.usuario ) {
            favoritos = req.usuario;
        }

        let productos;

        switch ( show ) {

            case 'cheap':

                productos = await Product.find( { estado: true } )
                    .sort( { precio: 1 } )
                    // .skip( skip )
                    // .limit( limit );
                
                break;

            case 'expensive':

                productos = await Product.find( { estado: true } )
                    .sort( { precio: -1 } )
                    // .skip( skip )
                    // .limit( limit );
                
                break;

            case 'order':

                productos = await Product.find( { estado: true } )
                    .sort( { nombre: 1 } )
                    // .skip( skip )
                    // .limit( limit );
                break;
        
            default:

                productos = await Product.find( { estado: true } )
                    // .skip( skip )
                    // .limit( limit );

                break;
        }

        if ( productos.length === 0 ) {
            return res.status( 404 ).json( {
                value: 0,
                msg: 'No hay productos registrados.'
            } );
        }

        productos = generateUrlPhotos( req, 'productos', productos );

        return res.status( 200 ).json( {
            value: 1,
            favoritos,
            productos
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener los productos.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener los productos.'
        } );
    }
}

async function getProduct( req, res ) {

    const { idProducto } = req.params;

    try {

        let producto = await Product.findById( idProducto );

        return res.status( 200 ).json( {
            value: 1,
            producto
        } );
        
    } catch ( error ) {

        console.error( 'Error al obtener el producto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al obtener el producto.'
        } );
    }
}

async function searchProduct( req, res ) {

    const { producto } = req.params;    
    const regex = new RegExp( producto, 'i' );
    let productos;

    try {

        productos = await Product.find( {
            $or: [ 
                { nombre: regex },
                { descripcion: regex },
                { categorias: regex }
            ]            
        } );

        if ( productos.length === 0 ) {

            productos = await Product.find( {
                $text: {
                    $search: producto,
                    $caseSensitive: false,
                    $diacriticSensitive: false
                }           
            } );
        }

        if ( productos.length === 0  ) {

            return res.status( 404 ).json( {
                value: 0,
                msg: 'Su búsqueda no generó resultados.'
            } );
        }

        productos = generateUrlPhotos( req, 'productos', productos );

        return res.status( 200 ).json( {
            value: 1,
            productos
        } );
        
    } catch ( error ) {

        console.error( 'Error al buscar el producto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al buscar el producto.'
        } );
    }
}

async function postProduct( req, res ) {

    try {

        if ( req.body.foto ) {
            req.body.foto = await uploadFile( req.body.foto, undefined, 'productos' );
        }

        const producto = new Product( req.body );

        await producto.save();

        res.status( 201 ).json( {
            value: 1,
            msg: 'El producto se ha guardado correctamente.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al guardar el producto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al guardar el producto.'
        } );
    }
}

async function putProduct( req, res ) {

    const { idProducto } = req.params;
    const { foto, ...datos } = req.body;

    try {

        const producto = await Product.findById( idProducto );

        if ( foto ) {
            if ( producto.foto ) {

                const pathImagen = path.join( __dirname, '../uploads/productos/', producto.foto );

                datos.foto = await uploadFile( req.body.foto, undefined, 'productos' );

                if ( fs.existsSync( pathImagen ) ) {
                    fs.unlinkSync( pathImagen );
                }
            }
        }

        await producto.updateOne( datos );

        res.status( 200 ).json( {
            value: 1,
            msg: 'El producto se ha actualizado correctamente.',
            producto
        } );
        
    } catch ( error ) {

        console.error( 'Error al actualizar el producto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al actualizar el producto.'
        } );
    }
}

async function deleteProduct( req, res ) {

    const { idProducto } = req.params;

    try {

        const producto = await Product.findByIdAndUpdate( idProducto, { estado: false } );

        if ( producto.foto ) {

            const pathImagen = path.join( __dirname, '../uploads/productos/', producto.foto );

            if ( fs.existsSync( pathImagen ) ) {
                fs.unlinkSync( pathImagen );
            }
        }

        res.status( 200 ).json( {
            value: 1,
            msg: 'El producto se ha eliminado correctamnete.'
        } );
        
    } catch ( error ) {

        console.error( 'Error al eliminar el producto.', error );

        return res.status( 500 ).json( {
            value: 0,
            msg: 'Error al eliminar el producto.'
        } );
    }
}

module.exports = {
    getProducts,
    getProduct,
    searchProduct,
    postProduct,
    putProduct,
    deleteProduct
}
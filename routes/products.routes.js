const router = require('express').Router();
const { check } = require( 'express-validator' );

const {
    validateFields,
    validateJWT,
    validatePermission
} = require( '../middlewares' );

const { dbValidators } = require( '../helpers');

const {
    getProducts,
    getProduct,
    searchProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require( '../controllers/products.controller' );

router.get( '/', validateJWT, getProducts );

router.get( '/:idProducto', [
    validateJWT,
    check( 'idProducto', 'No es un id válido.' ).isMongoId(),
    check( 'idProducto' ).custom( dbValidators.productExists ),
    validateFields
], getProduct );

router.get( '/search/:producto', [
    check( 'producto', 'Ingrese un artículo a buscar.' ).escape().trim().notEmpty(),
    validateFields
], searchProduct );

router.post( '/', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty().not().isNumeric(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty().not().isNumeric(),
    check( 'precio', 'Ingrese un precio válido.' ).trim().isNumeric(),
    check( 'categorias', 'Al menos una categoria es obligatoria.' ).isArray( { min: 1 } ),
    check( 'categorias.*', 'Ingrese categorias válidas.' ).not().isNumeric(),
    check( 'foto', 'La foto es obligatoria.' ).trim().notEmpty(),
    validateFields
], postProduct );

router.put( '/:idProducto', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idProducto', 'No es un id válido.' ).isMongoId(),
    check( 'idProducto' ).custom( dbValidators.productExists ),
    check( 'nombre', 'El nombre es obligatorio.' ).trim().escape().notEmpty().not().isNumeric(),
    check( 'descripcion', 'La descripcion es obligatoria.' ).trim().escape().notEmpty().not().isNumeric(),
    check( 'precio', 'Ingrese un precio válido.' ).trim().isNumeric(),
    check( 'categorias.*', 'Ingrese categorias válidas.' ).not().isNumeric(),
    validateFields
], putProduct );

router.delete( '/:idProducto', [
    validateJWT,
    validatePermission.isAdmin,
    check( 'idProducto', 'No es un id válido.' ).isMongoId(),
    check( 'idProducto' ).custom( dbValidators.productExists ),
    validateFields
], deleteProduct );

module.exports = router;
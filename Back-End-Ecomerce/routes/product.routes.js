const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const uploadProduct = require('../middlewares/upload-product');
const productController = require('../controllers/product.controller');
const productValidation = require('../middlewares/productValidation');

// GET products  obtener todos los productos que tengo
router.get('/products', productController.getProducts);

// GET product by ID   obtener producto por su id
router.get('/products/:id', productController.getProductById);

// Rutas que solo puede usar o consumir un Admin
// POST products

// crear productos
router.post('/products', [auth, isAdmin, uploadProduct, productValidation.validateProduct], productController.postProduct);

// DELETE products (ID)  borrar productos
router.delete('/products/:id', [auth, isAdmin], productController.deleteProduct)
// PUT products (ID) editar producto
router.put('/products/:id', [auth, isAdmin, uploadProduct], productController.updateProduct);

module.exports = router;

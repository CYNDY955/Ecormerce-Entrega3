const Product = require('../models/product.model');

async function getProducts(req, res) {
    try {
        const page = req.query.page || 0;
        const limit = req.query.limit || 10;

        const filter = [];

        if(req.query.name) filter.push({ name: { $regex: req.query.name, $options: 'i' }})
        if(req.query.category) filter.push({ category: req.query.category })
        if(req.query.minPrice) filter.push({ price: { $gte: req.query.minPrice }})

        if(filter.length === 0) filter.push({})

        const products = await Product.find({$and: filter})
                                        .populate("category", "name")
                                        .skip(page * limit)
                                        .limit(limit);

        const total = await Product.countDocuments({
            $and: filter
        });

        res.status(200).send({
            ok: true,
            message: "Productos obtenidos correctamente",
            products,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener los productos"
        });
    }
}

async function getProductById(req, res) {
    try {
        const id = req.params.id;
        const product = await Product.findById(id).populate('category');

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto obtenido correctamente",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener el producto"
        });
    }
}

// Crear productos
async function postProduct(req, res) {
    try {
        const product = new Product(req.body);

        if(req.file?.filename) {
            product.image = req.file.filename;
        }
        console.log('🧪 Producto a guardar:', product);

        const newProduct = await product.save();

        res.status(201).send({
            ok: true,
            message: "Producto creado correctamente",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al crear producto"
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto eliminado correctamente"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al eliminar producto"
        });
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;

        if(req.file?.filename) {
            data.image = req.file.filename;
        } else {
            delete data.image;
        }

        data.updatedAt = Date.now();

        // 
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });


        if (!updatedProduct) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al actualizar producto"
        });
    }
}

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    postProduct,
    updateProduct
};

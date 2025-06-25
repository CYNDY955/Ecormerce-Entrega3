const Order = require('../models/order.model');
const Product = require('../models/product.model');

async function postOrder(req, res) {
    try {
        if (req.user._id.toString() !== req.body.user) {
            return res.status(400).send({
                ok: false,
                message: "No puedes crear una orden para otro usuario"
            });
        }
        
        if (req.body.products.length === 0) {
            return res.status(401).send({
                ok: false,
                message: "La orden no puede estar vacía"
            });
        }

        await orderProductPriceVerification(req.body.products, req.body.total);

        const order = new Order(req.body);

        const newOrder = await order.save();

        res.status(201).send({
            ok: true,
            message: "Orden creada correctamente",
            order: newOrder
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al crear la orden"
        });
    }
}

async function orderProductPriceVerification(products, total) {
    try {
        let totalOrder = 0;
        for (let prod of products) {
            totalOrder += prod.price * prod.quantity;

            const product = await Product.findById(prod.product);

            if (!product || product.price !== prod.price) {
                throw new Error(`El producto con id ${prod.product} no existe o el precio no coincide`);
            }
        }

        if (totalOrder != total) {
            throw new Error("El total no es correcto");
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getOrders(req, res) {
    try {
        const id = req.params.id;
        let filter;

        if (req.user.role === "ADMIN_ROLE") {
            filter = id ? { user: id } : {};
        } else {
            filter = { user: req.user._id };
        }

        const orders = await Order.find(filter)
            .populate("user", "fullname email")
            .populate("products.product");

        return res.status(200).send({
            ok: true,
            message: "Órdenes obtenidas correctamente",
            orders
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al obtener órdenes"
        });
    }
}

async function putOrder(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ["open", "inprogress", "delivered", "cancelled"];

        if (!validStatuses.includes(status)) {
            return res.status(400).send({
                ok: false,
                message: `El status "${status}" no es válido. Valores permitidos: ${validStatuses.join(", ")}`
            });
        }

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).send({
                ok: false,
                message: "Orden no encontrada"
            });
        }

        if (order.status === "delivered" || order.status === "cancelled") {
            return res.status(400).send({
                ok: false,
                message: "No se puede cambiar una orden que ya fue entregada o cancelada"
            });
        }

        const updateData = { 
            status, 
            updatedAt: Date.now() 
        };

        if (status === "delivered" || status === "cancelled") {
            updateData.active = false;
            updateData.closedAt = Date.now();
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        res.status(200).send({
            ok: true,
            message: "Status de la orden actualizado correctamente",
            order: updatedOrder
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al actualizar la orden"
        });
    }
}

module.exports = {
    postOrder,
    getOrders,
    putOrder
};


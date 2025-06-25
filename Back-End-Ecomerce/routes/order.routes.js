const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/auth');

// Crear orden
router.post("/orders", auth, orderController.postOrder);

// Obtener órdenes (todas o por usuario)
router.get("/orders/:id?", auth, orderController.getOrders);

// Actualizar status de la orden
router.put("/orders/:id", auth, orderController.putOrder);

module.exports = router;


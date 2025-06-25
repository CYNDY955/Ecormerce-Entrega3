const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller')

// GET categories obtener todas las categorias
router.get("/categories", categoryController.getCategories )
// POST categories crear categorias nuevas
router.post("/categories", categoryController.createCategory )

module.exports = router;
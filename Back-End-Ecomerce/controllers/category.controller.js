const Category = require('../models/category.model');

async function getCategories(req, res) {
  try {
    const categories = await Category.find();

    if (!categories.length) {
      return res.status(404).send({
        ok: false,
        message: "No hay categorías registradas"
      });
    }

    res.status(200).send({
      ok: true,
      message: "Categorías obtenidas",
      categories
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).send({
      ok: false,
      message: "No se pudieron obtener las categorías"
    });
  }
}

async function createCategory(req, res) {
  try {
    const category = new Category(req.body);
    const newCategory = await category.save();

    res.status(201).send({
      ok: true,
      message: "Categoría creada correctamente",
      category: newCategory
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).send({
      ok: false,
      message: "No se pudo crear la categoría"
    });
  }
}

module.exports = { 
  getCategories,
  createCategory 
};

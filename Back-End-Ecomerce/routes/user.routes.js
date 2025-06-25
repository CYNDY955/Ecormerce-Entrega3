const express = require('express');
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');
const uploadUser = require('../middlewares/upload-user');
// GET users me llama todos los usurios que tengo
router.get("/users", userController.getUsers);
// GET users by id  busca por id del usuario
router.get("/users/:id", userController.getUserByid);
// POST users crear usuario nuevo
router.post("/users", uploadUser, userController.postUser);
// DELETE users borrar 
router.delete("/users/:id", [ auth, isAdmin ] , userController.deleteUser);
// PUT users
router.put("/users/:id", auth, uploadUser, userController.updateUser);

// POST login
router.post("/login", userController.login);

module.exports = router;

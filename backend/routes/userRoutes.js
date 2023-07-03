const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");

// Ruta para obtener todos los usuarios
router.get("/searchusers", userController.getUsers);

// Ruta para obtener un usuario por su ID
router.get("/searchusers/:id", userController.getUserById);

// Ruta para crear un usuario
router.post("/createuser", userController.createUser);

// Ruta para actualizar un usuario por su ID
router.put("/updateuser", userController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete("/deleteuser", userController.deleteUser);

module.exports = router;

// Ruta para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Ruta para obtener un usuario por su ID
const getUserById = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Ruta para crear un usuario
const createUser = async (req, res) => {
  const { nickname, email, contact } = req.body;

  // Validación de datos
  if (!nickname || !email || !contact) {
    return res
      .status(400)
      .json({ error: "Por favor, completa todos los campos obligatorios" });
  }

  // Verificar formato de correo electrónico válido
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Por favor, ingresa un correo electrónico válido" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "El correo electrónico ya está en uso" });
    }

    // Verificar si el nickname ya está en uso
    const existingNickname = await User.findOne({ where: { nickname } });
    if (existingNickname) {
      return res.status(409).json({ error: "El nickname ya está en uso" });
    }

    const newUser = await User.create({
      nickname,
      email,
      contact,
      created_at: new Date(),
    });
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Ha ocurrido un error al crear el usuario" });
  }
};

// Ruta para actualizar un usuario por su ID
const updateUser = async (req, res) => {
  const { nickname, email, contact, id, imageData} = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.nickname = nickname;
      user.email = email;
      user.contact = contact;
      user.profilePic = imageData;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Ruta para eliminar un usuario por su ID
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
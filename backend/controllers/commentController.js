const comment = require('../models/Comment')

/*Permite recibir todos los comentarios. Esto sé que tiene un problema importante
(debería tomar todos los comentarios en lugar de recibir todos los de un post o venta en específico por su ID). 
TODO; modificarlo para hacerlo.*/

exports.getComments = async (req, res) => {
    try {
        const comments = await comment.findAll();
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se encontró un error al obtener los comentarios.' });
    }
};

exports.createComment = async (req, res) => {
    const { comment } = req.body;

    try {
        const newComment = await comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se encontró un error al crear el comentario.' });
    }
};

exports.editComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    try {
        const updatedComment = await comment.update(req.body, { where: { id } });
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se encontró un error al editar el comentario.' });
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedComment = await comment.destroy({ where: { id } });
        res.status(200).json({ message: 'Mensaje borrado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Se encontró un error al borrar el comentario.' });
    }
};
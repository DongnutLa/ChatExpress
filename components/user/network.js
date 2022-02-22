const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const userList = await controller.getUsers();
        response.success(req, res, userList, 200);
    } catch (error) {
        response.error(res, req, 'Unexpected error', 500, error);
    }
});

router.post('/', async (req, res) => {

    try {
        const user = await controller.addUser(req.body.name);
        response.success(req, res, user, 201);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = await controller.updateUser(req.params.id, req.body.name);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await controller.deleteUser(req.params.id)
        response.success(req, res, `Usuario ${req.params.id} eliminado`, 200);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
})

module.exports = router;


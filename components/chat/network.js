const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

const router = express.Router();

router.get('/:userId', async (req, res) => {
    try {
        const chatList = await controller.getChats(req.params.userId);
        response.success(req, res, chatList, 200);
    } catch (error) {
        response.error(res, req, 'Unexpected error', 500, error);
    }
});

router.post('/', async (req, res) => {

    try {
        const chat = await controller.addChat(req.body.users);
        response.success(req, res, chat, 201);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
});

module.exports = router;


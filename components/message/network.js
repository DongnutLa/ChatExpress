const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
var path = require('path');

const router = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
  
  var upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    const filter = req.query.user || null;

    try {
        const messageList = await controller.getMessages(filter);
        const message = [];
        messageList.forEach(element => {
            message.push({...element._doc, date: element.date.toLocaleString('es-CO')})
        });
        response.success(req, res, message, 200);
    } catch (error) {
        response.error(res, req, 'Unexpected error', 500, error);
    }
    //req.headers
    //req.query -> ?text=Hola&text2=Holi
    //req.body
});

router.post('/', upload.single('file'), async (req, res) => {
    const { user, message, chat } = req.body

    try {
        const fullMessage = await controller.addMessage(user, message, chat, req);
        response.success(req, res, fullMessage, 201);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const data = await controller.updateMessage(req.params.id, req.body.message);
        response.success(req, res, data, 200);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await controller.deleteMessage(req.params.id)
        response.success(req, res, `Mensaje ${req.params.id} eliminado`, 200);
    } catch (error) {
        response.error(req, res, 'Información inválida', 400, 'Error en el contenido');
    }
})

module.exports = router;


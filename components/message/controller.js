const { socket } = require('../../socket');
const store = require('./store');

const addMessage = async (user, message, chat, req) => {
    if (!user || !message || !chat) {
        throw new Error('No hay chat, usuario o mensaje');
    }
    let fileUrl = '';
    if (req.file) {
        fileUrl = `${req.protocol}://${req.get('host')}/app/files/${req.file.filename}`;
    }
    const fullMessage = {
        chat,
        user,
        message,
        date: new Date(),
        file: fileUrl,
    }
    await store.addMessage(fullMessage);

    socket.io.emit('message', fullMessage);

    return fullMessage;
}

const getMessages = async (filter) => {
    const res = await store.getMessages(filter);
    return res;
}

const updateMessage = async (id, message) => {
    const res = await store.updateText(id, message);
    return res;
}

const deleteMessage = async (id) => {
    const res = await store.deleteMessage(id);
    return res;
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage,
}
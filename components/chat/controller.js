const store = require('./store');

const addChat = async (users) => {
    if (!users || users.length < 2) {
        throw new Error('Número de usuarios inválido');
    }
    const newChat = {
        users,
    }
    await store.addChat(newChat);
    return newChat;
}

const getChats = async (userId) => {
    const res = await store.getChats(userId);
    return res;
}

module.exports = {
    addChat,
    getChats,
}
const Model = require('./model');

const addChat = async (chat) => {
    const newChat = new Model(chat);
    await newChat.save();
}

const getChats = async (userId) => {
    let filter = {};
    if (userId) {
        filter = {
            users: userId,
        }
    }
    try {
        return await Model.find(filter).populate('users', {
            name: true,
        }).exec();
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { addChat, getChats }
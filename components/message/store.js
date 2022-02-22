const Model = require('./model');

const addMessage = async (message) => {
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessages = async (filter) => {
    let byUser = {}
    if (filter !== null) {
        byUser = { user: filter };
    }

    try {
        return await Model.find(byUser).populate('user', {
            name: true,
        })
        .exec();
    } catch (error) {
        throw new Error(error);
    }
}

const updateText = async (id, message) => {
    const foundMessage = await Model.findById(id);
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

const deleteMessage = async (id) => {
    const message = await Model.deleteOne({ _id: id });
    return message;
}

module.exports = { addMessage, getMessages, updateText, deleteMessage }
const Model = require('./model');

const addUser = async (user) => {
    const myUser = new Model(user);
    await myUser.save();
}

const getUsers = async () => {
    const users = await Model.find();
    return users;
}

const updateUser = async (id, name) => {
    const foundUser = await Model.findById(id);
    foundUser.name = name;
    const newUser = await foundUser.save();
    return newUser;
}

const deleteUser = async (id) => {
    const user = await Model.deleteOne({ _id: id });
    return user;
}

module.exports = { addUser, getUsers, updateUser, deleteUser }
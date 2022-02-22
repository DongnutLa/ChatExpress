const store = require('./store');

const addUser = async (name) => {
    if (!name) {
        throw new Error('Nombre inválido');
    }
    const user = {
        name,
    }
    await store.addUser(user);
    return user;
}

const getUsers = async () => {
    const res = await store.getUsers();
    return res;
}

const updateUser = async (id, name) => {
    const res = await store.updateUser(id, name);
    return res;
}

const deleteUser = async (id) => {
    const res = await store.deleteUser(id);
    return res;
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
}
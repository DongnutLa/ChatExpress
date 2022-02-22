const db = require('mongoose');


db.Promise = global.Promise;

const connect = async (uri) => {
    try {
        await db.connect(uri, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('[db] Conectada con éxito')
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = connect;
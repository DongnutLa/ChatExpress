const express = require('express');
const app = express();
const server = require('http').Server(app);

const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
const router = require('./network/routes');

uri = 'mongodb://dongnutla:1597@cluster0-shard-00-00.hdesg.mongodb.net:27017,cluster0-shard-00-01.hdesg.mongodb.net:27017,cluster0-shard-00-02.hdesg.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-12utp5-shard-0&authSource=admin&retryWrites=true&w=majority';

db(uri);
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(router);

socket.connect(server);
router(app);

app.use('/', express.static('public'));



server.listen(3000, () => {
    console.log('Listen in: http://localhost:3000');
});


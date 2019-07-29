const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {mongo_db} = require('./credentials/credentials')
mongoose.connect(mongo_db, {
    useNewUrlParser:true,
});
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use(cors());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')))
app.use('/users', express.static(path.resolve(__dirname, '..', 'uploads', 'usersImg')))
app.use(require('./routes'))
server.listen(8000);

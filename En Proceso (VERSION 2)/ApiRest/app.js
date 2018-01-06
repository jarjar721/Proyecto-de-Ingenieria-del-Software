'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let config = require('config');
let morgan = require('morgan');
let app = express();
let todoCtrl = require('./controllers/todo');

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.get('/v1/todo', todoCtrl.getTodos);
app.get('/v1/todo/:todoId', todoCtrl.getTodo);
app.post('/v1/todo', todoCtrl.saveTodo);
app.put('/v1/todo/:todoId', todoCtrl.updateTodo);
app.put('/v1/todo/:todoId/alterar-completado', todoCtrl.updateCompletado)
app.delete('/v1/todo/:todoId', todoCtrl.deleteTodo);

// Set Static Folder
app.use(express.static('TheUCABList'));

module.exports = app;

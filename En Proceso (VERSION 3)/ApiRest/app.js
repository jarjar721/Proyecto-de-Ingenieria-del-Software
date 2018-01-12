'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let app = express();
let todoCtrl = require('./controllers/todo');

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.get('/v1/todo', todoCtrl.getTodos);
app.get('/v1/todo/:todoId', todoCtrl.getTodo);
app.post('/v1/todo', todoCtrl.saveTodo);
app.put('/v1/todo/:todoId', todoCtrl.updateTodo);
app.put('/v1/todo/:todoId/alterar-completado', todoCtrl.updateCompletado)
app.delete('/v1/todo/:todoId', todoCtrl.deleteTodo);

app.get('/v1/lista', todoCtrl.getListas);
app.get('/v1/lista/:listaId', todoCtrl.getTodosLista);
app.post('/v1/lista', todoCtrl.saveLista);
app.delete('/v1/lista/:listaId', todoCtrl.deleteLista);
app.delete('/v1/lista/todo/:listaId', todoCtrl.deleteTodoLista);

// Set Static Folder
app.use(express.static('TheUCABList'));

module.exports = app;

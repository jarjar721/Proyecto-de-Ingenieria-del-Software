'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app= express()
const todoCtrl = require('./controllers/todo')

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

app.get('/v1/todo', todoCtrl.getTodos)
app.get('/v1/todo/:todoId', todoCtrl.getTodo)
app.post('/v1/todo', todoCtrl.saveTodo)
app.put('/v1/todo/:todoId', todoCtrl.updateTodo)
app.put('/v1/todo/:todoId/alterar-completado', todoCtrl.updateCompletado)
app.delete('/v1/todo/:todoId', todoCtrl.deleteTodo)

module.exports = app

'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = Schema ({
	_id: String,
	nombre: String,
	descripcion: String,
	completada: Boolean,
	lista_id: String,
	fecha: String
})

module.exports = mongoose.model('Todo', TodoSchema)

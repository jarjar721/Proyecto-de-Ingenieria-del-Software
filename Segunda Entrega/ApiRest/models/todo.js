'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = Schema ({
  nombre: String,
  descripcion: String,
  completada: Boolean,
  tipoTarea: String,
  fecha: String,
})

module.exports = mongoose.model('Todo', TodoSchema)

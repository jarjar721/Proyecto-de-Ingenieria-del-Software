'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListaSchema = Schema ({
  nombre: String,
  descripcion: String,
  completada: Boolean,
  fecha: String
})

module.exports = mongoose.model('Lista',ListaSchema)

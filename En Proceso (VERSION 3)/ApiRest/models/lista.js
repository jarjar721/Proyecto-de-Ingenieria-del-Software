'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListaSchema = Schema ({
	_id: String,
  	nombre: String,
})

module.exports = mongoose.model('Lista',ListaSchema)

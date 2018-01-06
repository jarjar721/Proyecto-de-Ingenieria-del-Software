'use strict'

let mongoose = require('mongoose')
const app = require ('./app')
//const port = process.env.PORT || 8080
let port = 8080;
var index;

mongoose.connect('mongodb://localhost:27017/todolists', (err,res) => {
	if(err) throw err
  	console.log('Conexión a la base de datos establecida')
  
    index = app.listen (port, () => {
    	console.log(`API REST corriendo en localhost:${port}`)
  	})

})

module.exports = index;
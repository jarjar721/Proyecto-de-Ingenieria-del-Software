'use strict'

const mongoose = require('mongoose')
const app = require ('./app')
const port = process.env.PORT || 8080

mongoose.connect('localhost:27017/todolists', (err,res) => {
  if(err) throw err
  console.log('Conexión a la base de datos establecida')
  app.listen (port, () => {
    console.log(`Apirest corriendo en localhost:${port}`)
  })
})

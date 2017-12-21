const Todo = require('../models/todo')

function getTodo (req, res) {
  let todoId = req.params.todoId

  Todo.findById(todoId, (err, todo) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!todo) return res.status(404).send({message: `El todo no existe`})

    res.status(200).send({ todo: todo})
  })
}

function getTodos(req, res) {
  Todo.find({}, (err, todos) => {
    if (err)  return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!todos)  return res.status(404).send({message: `No existen todos`})

      res.status(200).send({todos: todos})
  })
}

function saveTodo(req, res){
  console.log('POST /v1/todo')
  console.log(req.body)

  let todo = new Todo()
  todo.nombre = req.body.nombre
  todo.descripcion = req.body.descripcion
  todo.completada = req.body.completada
  todo.tipoTarea = req.body.tipoTarea
  todo.fecha = req.body.fecha

  todo.save((err, todoSaved) =>{
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({todo: todoSaved})
  })
}
function updateTodo (req, res) {
  let todoId = req.params.todoId
  let update = req.body

  Todo.findByIdAndUpdate(todoId, update, {new:true}, (err,todoUpdated) => {
    if (err)  return res.status(500).send({message: `Error al actualizar el todo: ${err}`})
    if (!todoUpdated)  return res.status(404).send({message: `El todo no existe`})

    res.status(200).send({ todo: todoUpdated})
  })
}

function updateCompletado (req,res) {
  let todoId = req.params.todoId
  let update = req.body
    Todo.findByIdAndUpdate (todoId, update, {new:true}, (err,todoUpdated) => {
      Todo.completada=  Todo.update.completada 
      if (err) return res.status(500).send({message: `Error al actualizar el todo: ${err}`})
      if (!todoUpdated) return res.status(404).send({message: `El todo no existe`})

      res.status(200).send({ todo: todoUpdated})
    })
}

function deleteTodo (req, res) {
  let todoId = req.params.todoId

  Todo.findById(todoId, (err, todo) => {
    if (err)  return  res.status(500).send({message: `Error al borrar el todo: ${err}`})
    if (!todo) return res.status(404).send({message: `El todo no existe`})
    todo.remove(err => {
      if (err) return res.status(500).send({message: `Error al borrar el todo: ${err}`})
      res.status(200).send({message: `El todo ha sido eliminado satisfactoriamente`})
    })
  })
}

module.exports = {
  getTodo,
  getTodos,
  saveTodo,
  updateTodo,
  updateCompletado,
  deleteTodo
}

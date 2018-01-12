const Todo = require('../models/todo');
const Lista = require('../models/lista');

/*-- NOTAS --*/

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
  todo._id = req.body._id
  todo.nombre = req.body.nombre
  todo.descripcion = req.body.descripcion
  todo.completada = req.body.completada
  todo.tipoTarea = req.body.tipoTarea
  todo.lista_id = req.body.lista_id
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

/*-- LISTAS --*/

function getListas(req, res) {
  Lista.find({}, (err, listas) => {
    if (err)  return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!listas)  return res.status(404).send({message: `No existen listas`})

      res.status(200).send({listas: listas})
  })
}

function getTodosLista (req, res) {
  let listaId = req.params.listaId

  Todo.find({ lista_id: listaId }, (err, todos) => {
    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!todos) return res.status(404).send({message: `Los todos no existen`})

    res.status(200).send({ todos: todos})
  })
}

function saveLista(req, res){
  console.log('POST /v1/lista')
  console.log(req.body)

  let lista = new Lista()
  lista._id = req.body._id
  lista.nombre = req.body.nombre

  lista.save((err, listaSaved) =>{
    if (err) return res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({lista: listaSaved})

  })
}

function deleteTodoLista (req, res) {
  let listaId = req.params.listaId

  Todo.find({ lista_id: listaId }, (err, todos) => {

    if (err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if (!todos) {
      return res.status(404).send({message: `Los todos no existen`})
    } else {
      var j = 0;

      for (var k = 0; k < todos.length; k++) {
        todos[k].remove(err => {
          if (err) return res.status(500).send({message: `Error al borrar el todo: ${err}`})
        })
        todos[k-j].remove(err => {
          if (err) return res.status(500).send({message: `Error al borrar el todo: ${err}`})
        })
        j = k + 1;
      }
      
      res.status(200).send({message: `El todo de la lista ha sido eliminado satisfactoriamente`})
    }
  })

}

function deleteLista (req, res) {

  let listaId = req.params.listaId

  Lista.findById(listaId, (err, lista) => {
    if (err)  return  res.status(500).send({message: `Error al borrar la lista: ${err}`})
    if (!lista) return res.status(404).send({message: `La lista no existe`})
    lista.remove(err => {
      if (err) return res.status(500).send({message: `Error al borrar la lista: ${err}`})
      res.status(200).send({message: `La lista ha sido eliminado satisfactoriamente`})
    })
  })

}


module.exports = {
  getTodo,
  getTodos,
  getTodosLista,
  saveTodo,
  updateTodo,
  updateCompletado,
  deleteTodo,
  getListas,
  saveLista,
  deleteLista,
  deleteTodoLista
}

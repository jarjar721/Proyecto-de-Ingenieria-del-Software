'use strict'

$(function() {

    var modal = $('div#notaModal.modal');
    var modalLista = $('div#listaModal.modal');
    var tituloModal = document.getElementById("tituloModal");
    var agregarNotaBtn = document.getElementById("agregarNota");
    var updateNotaBtn = document.getElementById("updateNota");
    var closeBtn = $('span.closeBtn');
    var nota_contenedor = $('div.nota-contenedor');
    var todoNota = $('div.todoNota');
    var seleccionado;
    var pizarraActualID = 'contenedor-general-primero';
    var cargado = false;
    var contadorNotas = 0;

    var usuario = document.getElementsByClassName("usuario");

    /*-- GET --*/
    $(document).on('click', '.Usuario', function(event) {
        console.log('REFRESH');
        $.ajax({

            url: '/v1/todo',
            method: 'GET',
            contentType: 'application/json',

            success: function(response) {
                console.log(response.todos[0]);
                console.log(response.todos.length);

                if ((response.todos.length != 0)&&(cargado == false))  {

                    for (var i = 0; i < response.todos.length; i++) {
                        nota_contenedor.append('\
                            <div id = "' + response.todos[i]._id + 'NOTA' + '" class = "todoNota">\
                                <p ID = "' + response.todos[i]._id + 'NOMBRE' + '" class = "nombreNota">' + response.todos[i].nombre + '</p>\
                                <input id = "' + response.todos[i]._id + '" class = "EliminarT" type = "submit" value = "X">\
                                <input class = "check" type = "checkbox" checked value = "' + response.todos[i].completada + '">\
                                <img id = "' + response.todos[i]._id + '" class="edit" src="img/lapiz.svg" width="25px">\
                                <br>\
                                <p id = "' + response.todos[i]._id + 'DESCRIPCION' + '" class = "descripcionNota">' + response.todos[i].descripcion + '</p>\
                            </div>\
                        ');
                        contadorNotas++;
                    }
                    
                    $('h3#noHayNotas')[0].style.display = 'none';
                    
                } else {
                    console.log('No hay notas en la base de datos!');
                }

                cargado = true;

            }

        });
    });

    /*-- POST --*/

    $('input.agregar_lista').on('click', function(event) {
        console.log('Vamos bien AGREGAR LISTA!');
        modalLista[0].style.display = 'block'; 
    });

    $("input#agregarLista").click(function(event){

        modalLista[0].style.display = 'none';
        var listaID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        $.ajax({
            url: '/v1/lista',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                _id: listaID,
                nombre: document.getElementsByName('nombreLista')[0].value,
            }),

            success: function(response) { 
                console.log(response);
                var listaNombre = document.getElementsByName('nombreLista')[0].value;
                pizarraActualID = listaID;

                $('#listas').append('\
                    <div id= "'+ listaID +'" class="contenedor-general">\
                        <div id= "'+ listaID +'" class="logo-interior"></div>\
                        <p id= "'+ listaID +'" class="tituloLista">'+ listaNombre + '</p>\
                        <img class="delete_lista" src="img/delete.png" width="12px" id= "'+ listaID +'">\
                    </div>\ ');

                document.getElementsByName('pizarra')[0].textContent = listaNombre;
                document.getElementsByName('nombreLista')[0].value = '';

                var todoNota = document.getElementsByClassName("todoNota");
                
                var j = 0;
                for (var k = 0; k < todoNota.length; k++) {
                    todoNota[k].remove();
                    todoNota[k-j].remove();
                    j = k + 1;
                }
                contadorNotas = 0;

            }

        });

    });

    $('div.agregar').on('click', function(event) {
        tituloModal.textContent = 'Nueva nota';
        console.log('Vamos bien AGREGAR NOTA!');
        agregarNotaBtn.style.display = 'block';
        updateNotaBtn.style.display = 'none';
        modal[0].style.display = 'block';

        document.getElementsByName('nombre')[0].value = '';
        document.getElementsByName('descripcion')[0].value = '';
    });

    $('input#agregarNota').on('click', function(event) {
        console.log('NOTA AGREGADA!');
        modal[0].style.display = 'none';
        var f = new Date();
        var todoID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        $.ajax({
            url: '/v1/todo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ 
                _id: todoID,
                nombre: document.getElementsByName('nombre')[0].value,
                descripcion: document.getElementsByName('descripcion')[0].value,
                completada: false,
                lista_id: pizarraActualID,
                fecha: f.toDateString(),
            }),

            success: function(response) {
                console.log(response);
                contadorNotas++;

                $('h3#noHayNotas')[0].style.display = 'none';

                var nombre = document.getElementsByName('nombre')[0].value;
                var descripcion = document.getElementsByName('descripcion')[0].value;

                nota_contenedor.append('\
                        <div id = "' + todoID + 'NOTA' + '" class = "todoNota">\
                            <p ID = "' + todoID + 'NOMBRE' + '" class = "nombreNota">' + nombre + '</p>\
                            <input id = "' + todoID + '" class = "EliminarT" type = "submit" value = "X">\
                            <input class = "check" type = "checkbox" checked value = "false">\
                            <img id = "' + todoID + '" class="edit" src="img/lapiz.svg" width="25px">\
                            <br>\
                            <p id = "' + todoID + 'DESCRIPCION' + '" class = "descripcionNota">' + descripcion + '</p>\
                        </div>\
                ');

                document.getElementsByName('nombre')[0].value = '';
                document.getElementsByName('descripcion')[0].value = '';

            }
        });

    });

    $('span.closeBtn').on('click', function(event) {
        modal[0].style.display = 'none';
        modalLista[0].style.display = 'none';
    });

    $('window').on('click', function(event) {
        if (event.target == modal) {
            modal[0].style.display = 'none';
            modalLista[0].style.display = 'none';
        }
    });

    
    /*-- UPDATE/PUT --*/
    
    $(document).on('click', '.logo-interior, .tituloLista', function(event) {

        var todoNota = document.getElementsByClassName("todoNota");
                
        var j = 0;
        for (var k = 0; k < todoNota.length; k++) {
            todoNota[k].remove();
            todoNota[k-j].remove();
            j = k + 1;
        }
        contadorNotas = 0;

        seleccionado = event.target;
        var tituloLista = document.getElementsByClassName("tituloLista");

        for (var i = 0; i < tituloLista.length; i++) {
            if (tituloLista[i].id == seleccionado.id) {

                document.getElementsByName('pizarra')[0].textContent = tituloLista[i].textContent;
                pizarraActualID = tituloLista[i].id;

                $.ajax({
                    url: '/v1/lista/' + pizarraActualID,
                    method: 'GET',
                    contentType: 'application/json',

                    success: function(response) {
                        console.log(response);

                        if (response.todos.length != 0)  {
                            for (var i = 0; i < response.todos.length; i++) {
                                nota_contenedor.append('\
                                    <div id = "' + response.todos[i]._id + 'NOTA' + '" class = "todoNota">\
                                        <p ID = "' + response.todos[i]._id + 'NOMBRE' + '" class = "nombreNota">' + response.todos[i].nombre + '</p>\
                                        <input id = "' + response.todos[i]._id + '" class = "EliminarT" type = "submit" value = "X">\
                                        <input class = "check" type = "checkbox" checked value = "' + response.todos[i].completada + '">\
                                        <img id = "' + response.todos[i]._id + '" class="edit" src="img/lapiz.svg" width="25px">\
                                        <br>\
                                        <p id = "' + response.todos[i]._id + 'DESCRIPCION' + '" class = "descripcionNota">' + response.todos[i].descripcion + '</p>\
                                    </div>\
                                ');
                                contadorNotas++;
                            }
                            $('h3#noHayNotas')[0].style.display = 'none';
                        }

                    }
                });

            }
        }
        
    });
    

    $(document).on('click', '.todoNota', function(event) {

        var descripcionNota = document.getElementsByClassName("descripcionNota");
        var cerrarNotas = document.getElementsByClassName("todoNota");

        for (var i = 0; i < cerrarNotas.length; i++) {
            cerrarNotas[i].style.height = "30px";
            descripcionNota[i].style.display = "none";
        }

        seleccionado = event.target;

        if (seleccionado.id != null) {
            console.log('ID del elemento seleccionado: ' + seleccionado.id);

            var notaUpdate = document.getElementById(seleccionado.id);
            console.log(notaUpdate);

            descripcionNota = document.getElementById(seleccionado.id.slice(0, -4) + "DESCRIPCION");
            console.log(descripcionNota);

            descripcionNota.style.display = 'block';
            notaUpdate.style.height = '200px';
        }

    });

    $(document).on('click', '.edit', function(event) {

        tituloModal.textContent = 'Actualizar nota';
        modal[0].style.display = 'block';
        agregarNotaBtn.style.display = 'none';
        updateNotaBtn.style.display = 'block';

        seleccionado = event.target;
        console.log('ID del elemento seleccionado: ' + seleccionado.id);

        document.getElementsByName('nombre')[0].value = document.getElementById(seleccionado.id + "NOMBRE").textContent;
        document.getElementsByName('descripcion')[0].value = document.getElementById(seleccionado.id + "DESCRIPCION").textContent;
    });

    $('input#updateNota').on('click', function(event) {
        console.log('NOTA ACTUALIZADA!');
        modal[0].style.display = 'none';
        var f = new Date();

        $.ajax({

            url: '/v1/todo/' + seleccionado.id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ 
                nombre: document.getElementsByName('nombre')[0].value,
                descripcion: document.getElementsByName('descripcion')[0].value,
                fecha: f.toDateString(),
            }),

            success: function(response) {

                document.getElementById(seleccionado.id + "NOMBRE").textContent = document.getElementsByName('nombre')[0].value;
                document.getElementById(seleccionado.id + "DESCRIPCION").textContent = document.getElementsByName('descripcion')[0].value;

            }

        });

    });

    /*-- DELETE --*/

    $(document).on('click', '.EliminarT', function(event) {

        seleccionado = event.target;
        console.log('ID del elemento seleccionado: ' + seleccionado.id);

        var notaBorrar = document.getElementById(seleccionado.id);

        $.ajax({

            url: '/v1/todo/' + notaBorrar.id,
            method: 'DELETE',
            contentType: 'application/json',

            success: function(response) {
                console.log(response);
                var todoNota = document.getElementById(seleccionado.id + "NOTA");
                todoNota.remove();

                contadorNotas--;
                if (contadorNotas == 0) {
                    $('h3#noHayNotas')[0].style.display = 'block';
                }
                
            }
        });

    });

    $(document).on('click', '.delete_lista', function(event) {

        var seleccionado = event.target;
        var tituloLista = document.getElementsByClassName("tituloLista");
        var lista = document.getElementById(seleccionado.id);

        $.ajax({

            url: '/v1/lista/todo/' + lista.id,
            method: 'DELETE',
            contentType: 'application/json',

            success: function(response){

                var todoNota = document.getElementsByClassName("todoNota");
                
                var j = 0;
                for (var k = 0; k < todoNota.length; k++) {
                    todoNota[k].remove();
                    todoNota[k-j].remove();
                    j = k + 1;
                }
                contadorNotas = 0;

            }

        })

        $.ajax({

            url: '/v1/lista/' + lista.id,
            method: 'DELETE',
            contentType: 'application/json',

            success: function(response) {
                console.log(response);
                lista.remove();
            }

        });

        $.ajax({
            url: '/v1/lista/' + 'contenedor-general-primero',
            method: 'GET',
            contentType: 'application/json',

            success: function(response) {
                console.log(response);

                document.getElementsByName('pizarra')[0].textContent = 'Pizarra';

                if (response.todos.length != 0)  {
                    for (var i = 0; i < response.todos.length; i++) {
                        nota_contenedor.append('\
                            <div id = "' + response.todos[i]._id + 'NOTA' + '" class = "todoNota">\
                                <p ID = "' + response.todos[i]._id + 'NOMBRE' + '" class = "nombreNota">' + response.todos[i].nombre + '</p>\
                                <input id = "' + response.todos[i]._id + '" class = "EliminarT" type = "submit" value = "X">\
                                <input class = "check" type = "checkbox" checked value = "' + response.todos[i].completada + '">\
                                <img id = "' + response.todos[i]._id + '" class="edit" src="img/lapiz.svg" width="25px">\
                                <br>\
                                <p id = "' + response.todos[i]._id + 'DESCRIPCION' + '" class = "descripcionNota">' + response.todos[i].descripcion + '</p>\
                            </div>\
                        ');
                        contadorNotas++;
                    }
                    $('h3#noHayNotas')[0].style.display = 'none';
                }
            }
        });
    })
});

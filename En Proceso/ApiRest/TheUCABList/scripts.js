$(function() {
    'use strict';

    /*// GET/READ
    $('#get-button').on('click', function() {
        $.ajax({
            url: '/products',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.products.forEach(function(product) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + product.id + '</td>\
                            <td><input type="text" class="name" value="' + product.name + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });*/

    var modal = $('div#notaModal.modal');
    var closeBtn = $('span.closeBtn');
    var nota_contenedor = $('div.nota-contenedor');
    var todoNota = $('div.todoNota');
    var contadorNotas = 0;

    jQuery(document).ready( 
        function () { 
            jQuery(window).bind('beforeunload',  
                function (e) {  
                    console.log('REFRESH');

      
                } 
            );
        } 
    );

    /*-- POST --*/

    $('input.agregar_lista').on('click', function(event) {
        console.log('Vamos bien AGREGAR LISTA!');
        $.ajax({
            url: '/v1/todo',
            method: 'POST',
            contentType: 'application/json',

            success: function(response) {
                console.log(response);
                var contenedor_listas = $('#contendor-listas');

                contenedor_listas.append('\
                    <div class="contenedor-general">\
                        <div class="logo-interior"></div>\
                        <p class="texto"> Lista 1 </p>\
                        <img class="delete_lista" src="img/delete.png" width="12px">\
                    </div>\
                ');
            }
        });
    });

    $('div.agregar').on('click', function(event) {
        console.log('Vamos bien AGREGAR NOTA!');
        modal[0].style.display = 'block';
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
                tipoTarea: 'Pizarra',
                fecha: f.toDateString(),
            }),

            success: function(response) {
                console.log(response);
                contadorNotas++;

                $('h3#noHayNotas')[0].style.display = 'none';

                var nombre = document.getElementsByName('nombre')[0].value;

                nota_contenedor.append('\
                        <div id = "' + todoID + 'NOTA' + '" class = "todoNota">\
                            <p class = "nombreNota">' + nombre + '</p>\
                            <input id = "' + todoID + '" class = "EliminarT" type = "submit" value = "X">\
                            <input class = "check" type = "checkbox" checked value = "false">                                <img class="edit" src="img/lapiz.svg" width="25px">\
                        </div>\
                ');

            }
        });

    });

    $('span.closeBtn').on('click', function(event) {
        modal[0].style.display = 'none';
    });

    $('window').on('click', function(event) {
        if (event.target == modal) {
            modal[0].style.display = 'none';
        }
    });

   /* // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
            }
        });
    }); */


    /*-- DELETE --*/

    $(document).on('click', '.EliminarT', function(event) {

        var seleccionado = event.target;
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
                
            }
        });

    });


});

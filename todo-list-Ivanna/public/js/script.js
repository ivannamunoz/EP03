window.onload = function()
{

	    var nomServicios = [
							{
								servicio 	: 	"Trae todas las tareas",
								urlServicio	: 	"getAllTask",
								metodo		: 	"GET"
							},
							{
								servicio 	: 	"Crear una nueva tarea",
								urlServicio	: 	"createTask",
								metodo		: 	"POST"
							},
							{
								servicio 	: 	"Editar una tarea",
								urlServicio	: 	"updateTask",
								metodo		: 	"PUT"
							},
							{
								servicio 	: 	"Eliminar Tarea",
								urlServicio	: 	"deleteTask",
								metodo		: 	"DELETE"
							},
							{
								servicio 	: 	"Trae una sola tarea",
								urlServicio	: 	"getTask",
								metodo		: 	"GET"
							}
						];

    var consumeServicios = function(tipo, val, callback)
	{
		var servicio = {
							url 	: nomServicios[tipo - 1].urlServicio,
							metodo	: nomServicios[tipo - 1].metodo,
							datos 	: ""
						};
		if(tipo === 4 || tipo === 5)
		{
			servicio.url += "/" + val;
		}
		else
		{
			servicio.datos = val !== "" ? JSON.stringify(val) : "";
		}
		//Invocar el servicio...
		$.ajax(
		{
			url 		: servicio.url,
			type 		: servicio.metodo,
			data 		: servicio.datos,
			dataType 	: "json",
			contentType: "application/json; charset=utf-8"
		}).done(function(data)
		{
            callback(data);
		});
	};


    consumeServicios(1, "", function(data){
    	console.log(data);
        for(var i = 0; i < data.length; i++)
        {
        	console.log(data[i].tasks);
        	tarea(data[i].tasks);
        	Mostrar();
            
        }
        
    });
    

     
function eliminar()
     {
    confirm('eliminar');
    consumeServicios(4, "123456", function(data){
    console.log("Eliminada, actualizar to-do");
    });
    $(this).parent('li').remove();
     }


function Mostrar() {
    var todos = Mostrar();
 
    var html ="<ul>";
    for(var i=0; i<todos.length; i++) {
        html +="<div class='done' id='tarea'>";
        html += (todos[i])+"&nbsp;&nbsp;&nbsp;<img class='eliminar'  align='center' id='elimina' src = 'img/elimina.png' border = '0' width='40px' heigth='40px' id ='"+i+"'/>";
        html +="</div>";
    };
    html += "</ul>";
 
    document.getElementById("todos").innerHTML = html;
 
    var eliminarbtn = document.getElementsByClassName("eliminar");
    for (var i=0; i < eliminarbtn.length; i++) {
        eliminarbtn[i].addEventListener("click", eliminar);
    };
}



var agregar = function(){
    
    var Nueva = $('#tarea');
     
     var newToDo = {finish : false, tasks :Nueva.val()};
     consumeServicios(2,newToDo, function(data){
        
         tarea(Nueva.val());
         $('#tarea').val("").focus();
         
     	 Mostrar();
    });
   
 };


$('#agrega').click(agregar);

function tarea(ta)
{
	this.tar=ta;
}



};
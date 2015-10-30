var express = 	require("express"),
	app		= 	express(),
	cons 	=	require("consolidate"),
	puerto 	= 	process.env.PORT || 8082,
	bodyParser 	= require('body-parser');

//consolidate integra swig con express...
app.engine("html", cons.swig); //Template engine...
app.set("view engine", "html");
app.set("views", __dirname + "/vistas");
app.use(express.static('public'));

//Para indicar que se env�a y recibe informaci�n por medio de Json...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Crear un token �nico relacionado al ID de la tarea...
var guid = function()
{
	function s4()
	{
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

var listaTareas = [
					{
						id 		: 	guid(),
						task	:	"Salir a correr",
						date	: 	"15/06/2015",
						finish	: 	true
					},
					{
						id 		: 	guid(),
						task	:	"Entregar trabajo EP03",
						date	: 	"22/10/2015",
						finish	: 	false
					},
					{
						id 		: 	guid(),
						task	:	"Finalizaci�n del segundo corte",
						date	: 	"30/10/2015",
						finish	: 	false
					}];

app.get("/", function(req, res)
{
	res.render("index", {
		titulo 	:  	"To-Do"
	});
});

//Servicios REST...
app.get('/getAllTask', function(req, res)
{
	res.json(listaTareas);
});

app.post('/createTask', function (req, res)
{
	res.json(crearEditarTarea(req.body, 1));
});

app.put('/updateTask', function (req, res)
{
	res.json(crearEditarTarea(req.body, 2));
});

app.delete('/deleteTask/:id', function(req, res)
{
	var ind = buscarIDTarea(req.param("id"));
	if(ind >= 0)
	{
		listaTareas.splice(ind, 1);
	}
	res.json({status : ind >= 0 ? true : false});
});

app.get('/getTask/:id', function(req, res)
{
	var ind = buscarIDTarea(req.param("id"));
	var devuelve = {datos : ind >= 0 ? listaTareas[ind] : "", status : ind >= 0 ? true : false};
	res.json(devuelve);
});

//Para cualquier url que no cumpla la condici�n...
app.get("*", function(req, res)
{
	res.status(404).send("P�gina no encontrada :( en el momento");
});

//Crear o edita un usuario...
var crearEditarTarea = function(data, tipo)
{
	var indice = 0;
	var date = new Date();
	var fechaActual = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();
	//se esta creando una nueva tarea...
	if(tipo === 1)
	{
		listaTareas.push(data);
		indice = listaTareas.length - 1;
		listaTareas[indice].id = guid();
		listaTareas[indice].date = fechaActual;

	}
	else
	{
		//Se est� editando una tarea...
		indice = buscarIDTarea(data.id); //La posci�n en el array...
		if(indice >= 0)
		{
			listaTareas[indice][data.field] = data[data.field];
		}
	}
	return listaTareas[indice];
}
//Busca la posici�n del usuario en el array...
var buscarIDTarea = function(id)
{
	var ind = -1;
	for(var i = 0; i < listaTareas.length; i++)
	{
		if(listaTareas[i].id === id)
		{
			ind = i;
			break;
		}
	}
	return ind;
};

app.listen(puerto);
console.log("Express server iniciado en el " + puerto);
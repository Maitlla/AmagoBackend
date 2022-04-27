// Ejemplo básico de Express con tareas, GET, POST, PUT, DELETE, (crear, modificar, eliminar, consultar)
import express from "express";
import { postUserController } from "./controllers/userControllers.mjs";
import { deleteTaskController, getTaskController, postTaskController, putTaskController } from "./controllers/tasksControllers.mjs";

// para incluir el módulo de Express, no es necesario en Javascript moderno (.mjs) al importar import express from "express";
//const express = require('express')

// Crear una aplicación de Express
const app = express(); 
const port = 3000; // puerto local se debería cambiar a otro para subirlo
//http://localhost:3000/api/v0.0/tasks/   para que se vea en la web


// .json() este método ya hace el parseo para que nos devuelva objetos en vez de string, de los endpoint (get, post, put, delete)
//app.use(express.json())

// hace lo mismo que app.use(express.json()) pero se aplica a los endpoints que se quiera, todos menos GET
const jsonParser = express.json();

// Crear usuarios
app.post("/api/v0.0/user/", jsonParser, postUserController);

// Definición de ruta que se llamará cuando se reciba una petición HTTP GET, con una dirección ('/') relativa al directorio raíz
/*
app.get('/', (req, res) => {
    res.send('Hello World!') // En el cuerpo de la respuesta, se responde con el mensaje "Hello World"
  });
 */

// Muestra las tareas
app.get("/api/v0.0/tasks/", getTaskController);


// Crea una tarea, y la añade en la última posición
app.post("/api/v0.0/task/", jsonParser, postTaskController);

// Modifica una tarea dejandola en la misma posición
// Modifica la descripción, o el estado, false o true, el id tiene que ser el mismo, para que sea esa tarea
app.put("/api/v0.0/task/", jsonParser, putTaskController);

// Elimina una tarea, la que se le indique
app.delete("/api/v0.0/task/", jsonParser, deleteTaskController);

// arrancar express F5
// para que express se empiece aejecutar (poner al final del código)
// “.listen” vinculará la aplicación al puerto de escucha de nuestra máquina.
app.listen(port, () => {
    console.log(`Express running... Example app listening on port ${port}`);
})


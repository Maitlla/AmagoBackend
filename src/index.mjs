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

            // ------------------ Usuarios -----------------------

app.get("/api/v0.0/user/", getTaskController);

app.post("/api/v0.0/user/", jsonParser, postUserController);

app.put("/api/v0.0/user/", jsonParser, putTaskController);

app.delete("/api/v0.0/user/", jsonParser, deleteTaskController);

            // ------------------ Usuarios -----------------------

app.get("/api/v0.0/tasks/", getTaskController);

app.post("/api/v0.0/task/", jsonParser, postTaskController);

app.put("/api/v0.0/task/", jsonParser, putTaskController);

app.delete("/api/v0.0/task/", jsonParser, deleteTaskController);

// arrancar express F5
// para que express se empiece aejecutar (poner al final del código)
// “.listen” vinculará la aplicación al puerto de escucha de nuestra máquina.
app.listen(port, () => {
    console.log(`Express running... Example app listening on port ${port}`);
})


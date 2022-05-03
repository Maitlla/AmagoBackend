// Ejemplo básico de Express con tareas, GET, POST, PUT, DELETE, (crear, modificar, eliminar, consultar)
import express from "express";
import { authMiddleware } from "./middleware/authorization.mjs";
import { getAllUsersController, getOneUserController, postUserController, putUserController, deleteUserController } from "./controllers/userControllers.mjs";
import { getAllTasksController, getOneTaskController, postTaskController, putTaskController, deleteTaskController } from "./controllers/tasksControllers.mjs";
import { validateNewTaskJSON, validateTaskJSON, validateDeleteTaskJSON, validateUserJSON, validateDeleteUserJSON } from "./middleware/jsonValidator.mjs";
// npm list   para consultar paquetes instalados
// npm install express
// para incluir el módulo de Express, no es necesario en Javascript moderno (.mjs) al importar import express from "express";
//const express = require('express')

const prefijoRuta = "/api/v0.0"

// Crear una aplicación de Express
const app = express(); 
const port = 3000; // puerto local se debería cambiar a otro para subirlo
//http://localhost:3000/api/v0.0/tasks/   para que se vea en la web

// .json() este método ya hace el parseo para que nos devuelva objetos en vez de string, de los endpoint (get, post, put, delete)
//app.use(express.json())

try {
// hace lo mismo que app.use(express.json()) pero se aplica a los endpoints que se quiera, todos menos GET
const jsonParser = express.json();

            // ------------------ Usuarios -----------------------

app.get(prefijoRuta + "/users/", authMiddleware, getAllUsersController);

app.get(prefijoRuta + "/public/users/", getAllUsersController);

//app.get(prefijoRuta + "/user/", authMiddleware, getOneUserController);

app.post(prefijoRuta + "/user/", authMiddleware, validateUserJSON, jsonParser, postUserController);

app.post(prefijoRuta + "/public/user/", validateUserJSON, jsonParser, postUserController);

app.put(prefijoRuta + "/user/", authMiddleware, validateUserJSON, jsonParser, putUserController);

app.put(prefijoRuta + "/public/user/", validateUserJSON, jsonParser, putUserController);

app.delete(prefijoRuta + "/user/", authMiddleware, validateDeleteUserJSON, jsonParser, deleteUserController);

app.delete(prefijoRuta + "/public/user/", validateDeleteUserJSON, jsonParser, deleteUserController);

            // ------------------ Usuarios -----------------------

app.get(prefijoRuta + "/tasks/", authMiddleware, getAllTasksController);

app.get(prefijoRuta + "/public/tasks/", getAllTasksController);

//app.get(prefijoRuta + "/task/", authMiddleware, getOneTaskController);

app.post(prefijoRuta + "/task/", authMiddleware, validateNewTaskJSON, jsonParser, postTaskController);

app.post(prefijoRuta + "/public/task/", validateNewTaskJSON, jsonParser, postTaskController);

app.put(prefijoRuta + "/task/", authMiddleware, validateTaskJSON, jsonParser, putTaskController);

app.put(prefijoRuta + "/public/task/", validateTaskJSON, jsonParser, putTaskController);

app.delete(prefijoRuta + "/task/", authMiddleware, validateDeleteTaskJSON, jsonParser, deleteTaskController);

app.delete(prefijoRuta + "/public/task/", validateDeleteTaskJSON, jsonParser, deleteTaskController);

// arrancar express F5
// para que express se empiece aejecutar (poner al final del código)
// “.listen” vinculará la aplicación al puerto de escucha de nuestra máquina.
app.listen(port, () => {
    console.log(`Express running... Example app listening on port ${port}`);
});
} catch (err) {
    console.error(err);
}



/*
app.get("/api/v0.0/users/", authMiddleware, getUsersController);

app.post("/api/v0.0/user/", authMiddleware, jsonParser, postUserController);

app.post("/api/v0.0/public/user/", jsonParser, postUserController);

app.put("/api/v0.0/user/", authMiddleware, jsonParser, putUserController);

app.delete("/api/v0.0/user/", authMiddleware, jsonParser, deleteUserController);


app.get("/api/v0.0/tasks/", authMiddleware, getTasksController);

app.post("/api/v0.0/task/", authMiddleware, jsonParser, postTaskController);

app.post("/api/v0.0/public/task/", jsonParser, postTaskController);

app.put("/api/v0.0/task/", authMiddleware, jsonParser, putTaskController);

app.delete("/api/v0.0/task/", authMiddleware, jsonParser, deleteTaskController);
*/




// Controladores: endpoints y Try catch
import { tasks } from "../models/tasksModels.mjs"

// GET endpoint para consultar, muestra la lista de tareas
export function getTasksController (request, response) {
    response.json(tasks)
};

// POST endpoint para crear/añadir, crea una tarea y la añade en la última posición
export function postTaskController (request, response) {
    tasks.push(request.body);
    response.sendStatus(201);
};

// PUT endpoint para editar/modificar, modifica una tarea dejandola en la misma posición
export function putTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
};

// DELETE endpoint para eliminar/borrar, elimina una tarea, la que se le indique
export function deleteTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx, 1); // se elimina un elemento
    response.sendStatus(200)
};



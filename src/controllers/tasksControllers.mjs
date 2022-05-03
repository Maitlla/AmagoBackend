// Controladores: endpoints y Try catch
import { tasks } from "../models/tasksModels.mjs"
import { taskss } from "../models/taskss.mjs"

// GET que devuelve el id, la descripción y el estado done de las tareas, guardadas en la BD
export function getAllTasksController (request, response) {
    taskss.all(
        `SELECT id, description, done FROM tasks`,
        (err,data)=>{
            if ( err ) {
                console.error(err);
                response.sendStatus(500) // Error de la BD no puede devolver la información que se le ha pedido
            } else {
                response.json(data)
            }
        }
    )
}

// GET endpoint para consultar, que devuelve una tarea concreta
export function getOneTaskController (request, response) {
    try {
        const task = tasks.find(
            item => item.id === parseInt(request.params.id)
        )
        if ( task ) response.json(task)
        else response.sendStatus(404); // Error tarea no encontrada
    } catch (err) {
        response.sendStatus(400) // Error genérico del cliente
    }
}

// POST endpoint para crear/añadir, crea una tarea y la añade en la última posición
export function postTaskController (request, response) {
    const { description, done } = request.body;
    taskss.run(
        `INSERT INTO tasks(description, done) VALUES ("${description}", ${done})`,
        (err)=>{
            if (err) {
                console.error(err);
                response.sendStatus(500) // Error de la Base de Datos
            } else {
                response.sendStatus(201) // ALL OK
            }
        }
    )
}

// Command.CommandText = "select last_insert_rowid()"; para recuperar/ver Id que se ha creado

/*
export function postTaskController (request, response) {
    tasks.push(request.body);
    response.sendStatus(201);
};
*/

// PUT endpoint para editar/modificar, modifica una tarea dejandola en la misma posición
export function putTaskController (request, response) {
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    );
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



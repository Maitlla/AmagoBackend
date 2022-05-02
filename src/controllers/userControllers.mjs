// Controladores: endpoints y Try catch
import { users } from "../models/userModels.mjs";
import { tasks } from "../models/tasks.mjs"

// GET que devuelve el id, el nombre y el password, guardados en la BD
export function getAllUsersController (request, response) {
    db.all(
        `SELECT id, name, password FROM users`,
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

// GET endpoint para consultar, que devuelve un usuario concreto
export function getOneUserController (request, response) {
    try {
        const user = users.find(
            item => item.id === parseInt(request.params.id)
        )
        if ( user ) response.json(user)
        else response.sendStatus(404); // Error tarea no encontrada
    } catch (err) {
        response.sendStatus(400) // Error genérico del cliente
    }
}

// POST endpoint para crear/añadir, crear usuarios
export function postUserController (request, response) {
    const { name, password } = request.body;
    db.run(
        `INSERT INTO tasks(name, password) VALUES ("${name}", ${password})`,
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


// PUT endpoint para editar/modificar, modifica datos de un usuario
export function putUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users[oldUserIdx] = updatedUser;
    response.sendStatus(200);
};

// DELETE endpoint para eliminar/borrar, elimina un usuario, el que se le indique
export function deleteUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users.splice(oldUserIdx, 1); // se elimina un elemento
    response.sendStatus(200)
};


/*
export function getUsersController (request, response) {
    response.json(users)
};

export function postUserController (request, response) {
    users.push(request.body);
    response.sendStatus(201)
};
*/


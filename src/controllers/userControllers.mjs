// Controladores: endpoints y Try catch
import { user } from "../models/userModels.mjs";

// GET endpoint para consultar, muestra la lista de usuarios
export function getUsersController (request, response) {
    response.json(user)
};

// POST endpoint para crear/añadir, crea usuarios
export function postUserController (request, response) {
    user.push(request.body);
    response.sendStatus(201)
};

// PUT endpoint para editar/modificar, modifica datos de un usuario
export function putUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = user.findIndex(
        item => item.id === updatedUser.id
    )
    user[oldUserIdx] = updatedUser;
    response.sendStatus(200);
};

// DELETE endpoint para eliminar/borrar, elimina un usuario, el que se le indique
export function deleteUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = user.findIndex(
        item => item.id === updatedUser.id
    )
    user.splice(oldUserIdx, 1); // se elimina un elemento
    response.sendStatus(200)
};


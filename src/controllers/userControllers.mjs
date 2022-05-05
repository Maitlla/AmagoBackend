// Controladores: endpoints y Try catch
import { users } from "../models/userModels.mjs";
import { taskss } from "../models/taskss.mjs"

// GET que devuelve el id, el nombre, el password, y el email guardados en la BD
export function getAllUsersController (request, response) {
    taskss.all(
        `SELECT id, name, password, email FROM users`,
        (error,data)=>{
            if ( error ) {
                console.error(error);
                response.sendStatus(500) // Error de la BD no puede devolver la información que se le ha pedido
            } else {
                response.json(data)
            }
        }
    )
};

// GET endpoint para consultar, que devuelve un usuario concreto
export function getOneUserController (request, response) {
    //const user = users.find(item => item.id === parseInt(request.params.id));
    taskss.get(
        `SELECT id, name, password, email FROM users WHERE id= ${request.params.id}`,
        (error, data) => {
            if (error) {
                console.error(error);
                response.sendStatus(500) // Error de la BD no puede devolver la información que se le ha pedido
            } else if (data) {
                response.json(data)
            }
        }
    )
};

// POST endpoint para crear/añadir, crear usuarios
export function postUserController (request, response) {
    const { name, password, email } = request.body;
    taskss.run(
        `INSERT INTO users(name, password, email) VALUES ("${name}", "${password}", "${email}")`,
        (error)=>{
            if (error) {
                console.error(error);
                response.sendStatus(500) // Error de la Base de Datos
            } else {
                response.sendStatus(201) // ALL OK
            }
        }
    )
};

// PUT endpoint para editar/modificar, modifica datos de un usuario
export function putUserController(request, response) {
    taskss.run(
        `UPDATE users SET name = "${request.body.name}" WHERE id = "${request.body.id}"`,
        (error) => {
            if (error) {
                console.error(error);
                response.sendStatus(500) // Error de la Base de Datos
            } else {
                response.sendStatus(201) // ALL OK
            }
        }
    )
};

// DELETE endpoint para eliminar/borrar, elimina un usuario, el que se le indique
export function deleteUserController(request, response) {
    taskss.run(
        `DELETE FROM users WHERE id = "${request.body.id}"`,
        (error) => {
            if (error) {
                console.error(error);
                response.sendStatus(500) // Error de la Base de Datos
            } else {
                response.sendStatus(200) // ALL OK
            }
        }
    )
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

/*
export function putUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users[oldUserIdx] = updatedUser;
    response.sendStatus(200);
};
*/

/*
export function deleteUserController (request, response) {
    const updatedUser = request.body;
    const oldUserIdx = users.findIndex(
        item => item.id === updatedUser.id
    )
    users.splice(oldUserIdx, 1); // se elimina un elemento
    response.sendStatus(200)
};
*/

/*
export function getOneUserController (request, response) {
    try {
        const user = users.find(item => item.id === parseInt(request.params.id));
        if ( user ) {
            response.json(user);
        } else {
            console.error(error);
            response.sendStatus(404); // Error usuario no encontrado
        }    
    } catch (error) {
        response.sendStatus(400) // Error genérico del cliente
    }
}
*/


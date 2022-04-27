// Controladores: endpoints y Try catch

import { user } from "../models/userModels.mjs";

// POST endpoint para crear/añadir, crea usuarios
export function postUserController (request, response) {
    user.push(request.body);
    response.sendStatus(201)
};



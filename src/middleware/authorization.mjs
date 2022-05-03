// Funciones de autorización, autenticación.... para los endpoint que requieren atenticación
import { taskss } from "../models/taskss.mjs"
import { users } from "../models/userModels.mjs";
//import { tasks } from "../models/tasksModels.mjs";

// Se decodifica la cadena Base64 en bytes de datos no codificados. 
// Luego se convierte el objeto similar a bytes en una cadena.

// El tipo de datos Error es un tipo de datos predefinido de JavaScript que permite crear objetos de tipo Error.

// Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor.
// Las funciones middleware suelen ser utilizadas como mecanismo para verificar niveles de acceso, validación de datos, etc...

// Si la función de middleware actual no finaliza el ciclo de solicitud/respuestas, 
// debe invocar la función next() para pasar el control a la siguiente función de middleware, o la solicitud quedará colgada.

// Función para la decodificación de una cadena Base64
function decodeAuthBasic (headerContent) {
    try {
        const [ method, token ] = headerContent.split(" ");
        const tokenString = atob(token);
        const [ name, password ] = tokenString.split(":");
        return { method, name, password }
    } catch (error) {
        throw "Malformed authentication"; // throw para lanzar una excepción (lanzar un error)
    }
}

// Middleware para dar acceso a un usuario, a una determinada URL, (para saber si un usuario esta o no logueado, registrado)
                          // solicitud, respuesta, (salta, para que la solicitud no quede colgada)
export function authMiddleware( request, response, next ) {
    try {                                        // objeto Request, (Content-Type':), Authorization: token
        const { method, name, password } = decodeAuthBasic(request.headers.authorization);

        if ( method != "Basic" ) throw "Invalid authorization method. Use Basic instead."
    
        taskss.get(
            `SELECT * FROM users WHERE name = "${name}" AND password = "${password}"`,
            (error, data) => {
                if (error) {
                    console.error(error);
                    response.sendStatus(500);
                } else if (data) {
                    next(); // si el usuario es correcto salta...
                } else {
                    throw "Usuario inválido o contraseña incorrecta"
                }
            }
        )
        /*
        const user = users.find(
            item => item.name === username && item.password === password
        )
        */

    } catch (error) {
        console.error(error);
        response.sendStatus(401)
        return;
    }
}





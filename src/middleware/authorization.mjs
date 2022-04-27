// Funciones de autorización, autenticación....
import { users } from "../models/userModels.mjs";
import { tasks } from "../models/tasksModels.mjs";

// 
function decodeAuthBasic (headerContent) {
    try {
        const [ method, token ] = headerContent.split(" ");
        const tokenString = atob(token);
        const [ username, password ] = tokenString.split(":");
        return { method, username, password }
    } catch (error) {
        throw "Malformed authentication";
    }
}


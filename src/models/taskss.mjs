// Base de datos para la aplicación de Tareas
import sqlite3 from 'sqlite3';
// npm install sqlite3
export const taskss = new sqlite3.Database('./taskss.db', (err) => { // conectarse a la Base de datos, si no la hay la crea
    if (err) {
        throw err.message;
    }
    console.log('Connected to the taskss database.');
});

taskss.run(`
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`);

taskss.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL 
        )
`);


// (done BOOLEAN DEFAULT false NOT NULL) en SQLITE al determinar BOOLEAN es 0 o no cero, false se considera 0
/*
taskss.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL,
            id_user INTEGER NOT NULL,
            FOREIGN KEY ( id_user )
                REFERENCES users (id) 
                    ON DELETE CASCADE 
                    ON UPDATE CASCADE
        )
`);
*/


/*
taskss.run(`
    INSERT
`);
  */

export function sqlCallback(error, data) {
    console.log("error:", error, "data:", data);
    if (error) throw error;
}

export function findUser(name, password, callback) {
    taskss.get(`
        SELECT id
        FROM users
        WHERE name = "${name}" AND password = "${password}"
        `,
        callback
    )
}

export function insertUser(userObject, callback) {
    const { id, name, password } = userObject;
    const sql = `
        INSERT INTO users (id, name, password)
        values (${id}, "${name}", "${password}");
    `;
    taskss.run(sql, callback);
}

export function getUsers(callback) {
    taskss.all("SELECT id, name FROM users", callback);
}

export function insertTask(taskObject, callback) {
    const { id, description, done } = taskObject;
    const sql = `
        INSERT INTO tasks (id, description, done)
        values (${id}, ${description}, "${done}");
    `;
    taskss.run(sql, callback);
}

export function getLastTask(minutes, callback) {
    const afterTime = Date.now() - 60000 * minutes;
    taskss.all(`
        SELECT *
        FROM tasks
        WHERE time >= ${afterTime}
        `,
        callback
    )
}

export default taskss;
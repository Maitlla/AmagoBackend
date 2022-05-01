// Base de datos para la aplicación de Tareas
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./tasks.db', (err) => { // se crea la Base de datos y se conecta
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the tasks database.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
`);

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tasks (
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL,
            done BOOLEAN
        )
`);

/*
db.run(`
    INSERT
`);
  */

export function sqlCallback (error, data) {
    console.log("error:", error, "data:", data);
    if ( error ) throw error;
}

export function findUser ( name, password, callback ) {
    db.get(`
        SELECT id
        FROM users
        WHERE name = "${name}" AND password = "${password}"
        `,
        callback
    )
}

export function findSource ( source, password, callback ) {
    db.get(`
        SELECT id
        FROM users
        WHERE id = "${source}" AND password = "${password}"
        `,
        callback
    )
}

export function insertUser ( userObject, callback ) {
    const { id, name, password } = userObject;
    const sql = `
        INSERT INTO users (id, name, password)
        values (${id}, "${name}", "${password}");
    `;
    db.run(sql,callback);
}

export function getUsers ( callback ) {
    db.all("SELECT id, name FROM users", callback);
}

export function insertTasks ( tasksObject, callback) {
    const { id, description, done } = tasksObject;
    const sql = `
        INSERT INTO tasks (id, description, done)
        values (${id}, ${description}, "${done}");
    `;
    db.run(sql,callback);
}


export default db;
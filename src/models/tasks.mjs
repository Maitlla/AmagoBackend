// Base de datos para la aplicación de Tareas
import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./tasks.db', (err) => { // conectarse a la Base de datos, si no la hay la crea
    if (err) {
        throw err.message;
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
            description VARCHAR(100) NOT NULL,
            done BOOLEAN DEFAULT false NOT NULL 
        )
`);


// (done BOOLEAN DEFAULT false NOT NULL) en SQLITE al determinar BOOLEAN es 0 o no cero, false se considera 0
/*
db.run(`
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
db.run(`
    INSERT
`);
  */


export default db;
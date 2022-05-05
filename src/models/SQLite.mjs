import taskss from "./taskss.mjs";

// Función que añade una columna concreta a una tabla
export function insertColumn() {
    const sql =  
    `ALTER TABLE users
    ADD COLUMN email TEXT NOT NULL DEFAULT ""`;
    taskss.run(sql);
}
//insertColumn()

// Función que elimina una columna concreta de una tabla
export function deleteColumn() {
    const sql =  
    `ALTER TABLE users
    DROP COLUMN email`;
    taskss.run(sql);
}
//deleteColumn()



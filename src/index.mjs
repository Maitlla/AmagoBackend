// Ejemplo básico de Express con tareas, GET, POST, PUT, DELETE, (crear, modificar, eliminar, consultar)
import express from "express";
const app = express();
const PORT = 3000; // puerto local se debería cambiar a otro para subirlo
//http://localhost:3000/api/v0.0/tasks/   para que se vea en la web

// Se añaden tareas para probar
const tasks = [
    {
        id: 0,
        description: "Arreglar Chat",
        done: false
    },
    {
        id: 1,
        description: "Mockups LuaWave",
        done: false
    },
    {
        id: 2,
        description: "Examen martes",
        done: false
    },
    {
        id: 3,
        description: "Comprar galletas",
        done: false
    },
    {
        id: 4,
        description: "Comprar agua",
        done: false
    },
    {
        id: 5,
        description: "Recoger pedido",
        done: false
    }
]

// .json() este método ya hace el parseo para que nos devuelva objetos en vez de string, de los endpoint (get, post, put, delete)
app.use(express.json())

// Muestra las tareas
app.get("/api/v0.0/tasks/",(request, response)=>{
    response.json(tasks)
})

// Crea una tarea, y la añade en la última posición
app.post("/api/v0.0/task/",(request, response)=>{
    tasks.push(request.body);
    response.sendStatus(201);
})

// Modifica una tarea dejandola en la misma posición
// Modifica la descripción, o el estado, false o true, el id tiene que ser el mismo, para que sea esa tarea
app.put("/api/v0.0/task/",(request, response)=>{
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    response.sendStatus(200);
})

// Elimina una tarea, la que se le indique
app.delete("/api/v0.0/task/",(request, response)=>{
    const updatedTask = request.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx, 1); // se elimina un elemento
    response.sendStatus(200)
})


// para que express se empiece aejecutar (poner al final del código)
app.listen(PORT,()=>{
    console.log("Express running...");
})


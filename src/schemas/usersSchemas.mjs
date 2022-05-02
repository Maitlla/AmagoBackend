// Schema validaciones

export const userSchema = {
    $id: "/user",
    type: "object",
    properties: {
        name: {
            description: "User unique name",
            type: "string"
        },
        password: {
            description: "User secret",
            type: "string"
        },
    },
    additionalProperties: false
}

//Añadido por mi

export const deleteUserSchema = {
    $id: "/deleteUser",
    type: "object",
    properties: {
        id: {
            description: "User unique identificator",
            type: "integer",
            minimum: 0
        }
    },
    additionalProperties: false
}
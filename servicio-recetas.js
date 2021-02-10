
//npm install fastify

const fs = require("fs");

const server = require("fastify")({
    https: {
        key: fs.readFileSync(__dirname + "/tls/llave-privada.key"),
        cert: fs.readFileSync(__dirname + "/shared/tls/certificado-publico.cert")
    }
});

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;


console.log(`Proceso pid=${process.pid}`);

//http://localhost:4000/recetas/42  <- (id)
server.get('/recetas/:id', async (request, response) => {

    console.log(`Proceso de atención de la solicitud pid=${process.pid}`);
    const id = Number(request.params.id);

    if (id !== 42) {

        response.statusCode = 404;
        return { error : "No se encontró receta" };

    }

    return { 
        pid : process.pid, 
        receta : {
            id,
            nombre : "Taco de pollo",
            pasos : "Agarra la tortilla y echale pollo",
            ingredientes : [

                {id: 1, nombre: "Tortilla", cantidad: "2 unidades"},
                {id: 2, nombre: "Pollo", cantidad: "800 grs"}

            ]
        }
    };

});

server.listen(PORT, HOST, () => { 

    console.log(`Servidor ejecutandose en http://${HOST}:${PORT}`);

});



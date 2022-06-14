const express = require("express");
const app = express();
app.use(express.json());

/**
 * GET - Buscar uma informação do back-end
 * POST - Criar uma informação no back-end
 * PUT - Atualizar uma informação no back-end
 * PATCH - Atualizar uma informação especifica no back-end
 * DELETE - Deletar uma informação no back-end
 */

/**
 * Tipos de parâmetros:
 * Route Params: Parâmetros utilizados para identificar recursos (editar/deletar/buscar recurso)
 * Query Params: Parâmetros nomeados enviados na rota após "?" (Filtros, paginação)
 * Request Body: Corpo da requisição, utilizado para criar ou atualizar recursos
 */

app.get("/courses", (req, res) => {
  // res.send('Hello World!');
  return res.json(["curso1", "curso2", "curso3"]);
});

app.post("/courses", (req, res) => {
  // res.send('Hello World!');
  return res.json(["curso1", "curso2", "curso3", "curso4"]);
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log(req.query);
  console.log(req.body);
  return res.json(["curso6", "curso2", "curso3", "curso4"]);
});

app.patch("/courses/:id", (req, res) => {
  return res.json(["curso6", "curso7", "curso3", "curso4"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["curso1", "curso3", "curso4"]);
});

//localhost:3333
app.get("/", (req, res) => {
  // return res.send('Hello World!');
  return res.json({ message: "Hello Worldd!" });
});

app.listen(3333);

const express = require("express");
const server = express();

//Informando que a leitura será de JSON
server.use(express.json());

const users = ["Diego", "Raphael", "Elena", "Marcelle"];

// localhost:3000/users/1
// Query params: ?teste=1
// Route params: /users/1'
// Request body: {"name": "Raphael"}

server.get("/users", (req, res) => {
  return res.json(users);
});

server.get("/users/:index", (req, res) => {
  const { index } = req.params;

  return res.json({
    message: users[index]
  });
});

/**
 * Inclusão de usuário
 */
server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

/**
 * Alteração de usuário
 */
server.put("/users/:index", (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

/**
 * Exclusão
 */
/**
 * Alteração de usuário
 */
server.delete("/users/:index", (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
console.log("Server started...");

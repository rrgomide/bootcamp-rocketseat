const express = require('express');
const server = express();

//Informando que a leitura será de JSON
server.use(express.json());

const users = ['Diego', 'Raphael', 'Elena', 'Marcelle'];

// localhost:3000/users/1
// Query params: ?teste=1
// Route params: /users/1'
// Request body: {"name": "Raphael"}

/**
 * server.get|post|put|delete são middlewares
 */

/**
 * Middleware global
 */
server.use((req, res, next) => {
  console.log(`Método: ${req.method} - Url: ${req.url}`);

  /**
   * Para seguir a execução
   */
  return next();
});

/**
 * Middleware local
 */
function checkNameExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: 'User name is required!' });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  if (!user[req.params.index]) {
    return res.status(400).json({ error: 'User does not exist!' });
  }
}

server.get('/users', (req, res) => {
  return res.json(users);
});

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json({
    message: users[index]
  });
});

/**
 * Inclusão de usuário
 */
server.post('/users', checkNameExists, (req, res) => {
  const { name } = req.body;
  users.push(name);
  return res.json(users);
});

/**
 * Alteração de usuário
 */
server.put('/users/:index', (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;
  return res.json(users);
});

/**
 * Exclusão de usuário
 */

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;
  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
console.log('Server started...');

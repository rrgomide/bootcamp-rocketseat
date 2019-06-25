/**
 * Requiring express
 */
const express = require('express');

/**
 * Utility functions
 */
const { newFormattedDate } = require('./utils');

/**
 * Creating server
 */
const server = express();

/**
 * Telling server that we'll
 * use JSON as data
 */
server.use(express.json());

/**
 * Application state
 */
const state = {
  projects: [
    {
      id: '1',
      title: 'Main project',
      tasks: ['Task1', 'Task2']
    }
  ],
  numberOfRequests: 0
};

/**
 * Crie um middleware global chamado em todas requisições que imprime
 * (console.log) uma contagem de quantas requisições
 * foram feitas na aplicação até então
 */
server.use((req, res, next) => {
  console.log(`Requests already made: ${++state.numberOfRequests}`);
  next();
});

function projectFound(id) {
  return state.projects.some(project => project.id === id);
}

/**
 * Crie um middleware que será utilizado em todas rotas que recebem o ID
 * do projeto nos parâmetros da URL que verifica se o projeto
 * com aquele ID existe. Se não existir retorne um erro,
 * caso contrário permita a requisição continuar normalmente;
 */
function checkIdExists(req, res, next) {
  const { id } = req.params;

  if (!projectFound(id)) {
    return res
      .status(400)
      .json({ error: `A project with id ${id} does not exist.` });
  }

  next();
}

/**
 * POST /projects: A rota deve receber id e title dentro corpo de cadastrar
 * um novo projeto dentro de um array no seguinte
 * formato: { id: "1", title: 'Novo projeto', tasks: [] };
 */
server.post('/projects', (req, res, next) => {
  const { id, title, tasks } = req.body;

  /**
   * Validating id
   */
  if (!id) {
    return res.status(400).json({ error: `Invalid id` });
  }

  /**
   * Validating title
   */
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: `Invalid title` });
  }

  /**
   * Inserting project
   */
  if (projectFound(id)) {
    return res
      .status(400)
      .json({ error: `Project with id ${id} already exists.` });
  }

  /**
   * Inserting project validating tasks
   */
  state.projects.push({
    id,
    title,
    tasks: !!tasks && tasks.length > 0 ? tasks : []
  });

  /**
   * Formatting returned JSON
   */
  //return res.send(JSON.stringify(state.projects, null, 2));
  return res.json(state.projects);
});

/**
 * GET /projects: Rota que lista todos projetos e suas tarefas
 */
server.get('/projects', (req, res, next) => {
  return res.json(state.projects);
});

/**
 * PUT /projects/:id: A rota deve alterar apenas o
 * título do projeto com o id presente nos parâmetros da rota;
 */
server.put('/projects/:id', checkIdExists, (req, res, next) => {
  const { id } = req.params;
  const { newTitle } = req.body;

  if (!newTitle || newTitle.trim() === '') {
    return res.status(400).json({ error: `Invalid title!` });
  }

  const projectToBeModified = state.projects.find(project => project.id === id);
  projectToBeModified.title = newTitle;

  return res.json(projectToBeModified);
});

/**
 * DELETE /projects/:id: A rota deve deletar o projeto com o id
 * presente nos parâmetros da rota;
 */
server.delete('/projects/:id', checkIdExists, (req, res, next) => {
  const { id } = req.params;

  const index = state.projects.findIndex(project => project.id === id);
  state.projects.splice(index, 1);

  return res.json(state.projects);
});

/**
 * Starting server at port 3001
 */
server.listen(3001);
console.log(`Server started at ${newFormattedDate()}`);

// const { Router } = require('express');
import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Hello, world!' }));

// module.exports = routes;
export default routes;

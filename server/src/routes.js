import { Router } from 'express';

import DevController from './app/controllers/DevController';
import SearchController from './app/controllers/SearchController';

const routes = new Router();

// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros:
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso nma alteração ou remoção)
// Body: request.body (Dados para criação ou alteração de um registro)

// mongoDB (Não-relacional)

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

export default routes;

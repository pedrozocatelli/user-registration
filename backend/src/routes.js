import { Router } from 'express';

import UserController from './app/controllers/UserController';
import AddressController from './app/controllers/AddressController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/addresses/:id', AddressController.index);
routes.put('/addresses/', AddressController.update);

export default routes;

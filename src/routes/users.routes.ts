import { Router } from 'express';

import { credentials } from '../validators';
import UsersController from '../controllers/UsersController';

const routes = Router();

// Users
const usersController = new UsersController();

routes.get('/users', usersController.index);
routes.post('/users', credentials, usersController.create);

export default routes;

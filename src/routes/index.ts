import express, { Router } from 'express';
import path from 'path';

import ToolsController from '../controllers/ToolsController';
import UsersController from '../controllers/UsersController';
import ensureAuthenticated from 'middlewares/ensureAuthenticated';
import SessionsController from '../controllers/SessionsController';

const routes = Router();

// Tools
const toolsController = new ToolsController();

routes.get('/tools', toolsController.index);
routes.post('/tools', ensureAuthenticated, toolsController.create);
routes.delete('/tools/:id', ensureAuthenticated, toolsController.delete);

// Users
const usersController = new UsersController();

routes.get('/users', usersController.index);
routes.post('/users', usersController.create);

// Sections
const sessionsController = new SessionsController();

routes.post('/sections', sessionsController.create);

// Documentation
const docFolder = path.resolve(__dirname, '..', '..', 'docs');
routes.use('/docs', express.static(docFolder));

export default routes;

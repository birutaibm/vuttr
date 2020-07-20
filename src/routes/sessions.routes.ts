import { Router } from 'express';

import { credentials } from '../validators';
import SessionsController from '../controllers/SessionsController';

const routes = Router();

// Sections
const sessionsController = new SessionsController();

routes.post('/sessions', credentials, sessionsController.create);

export default routes;

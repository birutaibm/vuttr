import { Router } from 'express';

import toolsRouter from './tools.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import docsRouter from './docs.routes';

const routes = Router();

routes.use(toolsRouter);
routes.use(usersRouter);
routes.use(sessionsRouter);
routes.use(docsRouter);

export default routes;

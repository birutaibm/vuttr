import { Router } from 'express';

import ToolsController from '../controllers/ToolsController';

const routes = Router();
const toolsController = new ToolsController();

routes.get('/tools', toolsController.index);

export default routes;

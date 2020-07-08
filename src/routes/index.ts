import { Router } from 'express';

import ToolsController from '../controllers/ToolsController';

const routes = Router();
const toolsController = new ToolsController();

routes.get('/tools', toolsController.index);
routes.post('/tools', toolsController.create);
routes.delete('/tools/:id', toolsController.delete);

export default routes;

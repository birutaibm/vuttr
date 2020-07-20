import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { deleteTool, createTool, listTools } from '../validators';
import ToolsController from '../controllers/ToolsController';

const routes = Router();

// Tools
const toolsController = new ToolsController();

routes.get('/tools', listTools, toolsController.index);
routes.post('/tools', ensureAuthenticated, createTool, toolsController.create);
routes.delete('/tools/:id', ensureAuthenticated, deleteTool, toolsController.delete);

export default routes;

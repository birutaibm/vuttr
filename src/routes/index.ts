import express, { Router } from 'express';
import path from 'path';

import ToolsController from '../controllers/ToolsController';

const routes = Router();

// Tools
const toolsController = new ToolsController();

routes.get('/tools', toolsController.index);
routes.post('/tools', toolsController.create);
routes.delete('/tools/:id', toolsController.delete);

// Documentation
const docFolder = path.resolve(__dirname, '..', '..', 'docs');
console.log(docFolder);
routes.use('/docs', express.static(docFolder));

export default routes;

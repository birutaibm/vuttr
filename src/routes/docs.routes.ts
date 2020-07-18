import express, { Router } from 'express';
import path from 'path';

const routes = Router();

// Documentation
const docFolder = path.resolve(__dirname, '..', '..', 'docs');
routes.use('/docs', express.static(docFolder));

export default routes;

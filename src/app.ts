import express from 'express';
import path from 'path';

import routes from './routes';

const docFolder = path.resolve(__dirname, '..', 'docs');
console.log(docFolder);

const app = express();

app.use(express.json());
app.use('/docs', express.static(docFolder));
app.use(routes);

export default app;

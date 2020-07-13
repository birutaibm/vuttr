import express from 'express';

import routes from './routes';
import DB from 'db';

DB.connect();

const app = express();

app.use(express.json());
app.use(routes);

export default app;

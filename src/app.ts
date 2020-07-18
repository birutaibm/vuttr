import express from 'express';

import routes from './routes';
import globalExceptionHandler from './middlewares/globalExceptionHandler';
import DB from 'db';
import { errors as celebrateErrors } from 'celebrate';

DB.connect();

const app = express();

app.use(express.json());
app.use(routes);
app.use(celebrateErrors());
app.use(globalExceptionHandler)

export default app;

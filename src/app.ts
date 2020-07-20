import express from 'express';
import cors from 'cors';
import { errors as celebrateErrors } from 'celebrate';

import routes from './routes';
import globalExceptionHandler from './middlewares/globalExceptionHandler';
import DB from './db';

DB.connect();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(celebrateErrors());
app.use(globalExceptionHandler)

export default app;

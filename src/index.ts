import 'dotenv/config';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { createContext } from 'middleware/addContext';
import { assignRequestId } from 'middleware/addRequestId';

import Logger, { ExpressLogger } from './logger';
import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

import httpContext from 'express-http-context'
import { assignHttpContextRequestId } from 'middleware/addHttpContextRequestId';
import { initialise } from './init'

export const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
    allowedHeaders: ['Content-Type', 'Authorization', 'client_id'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(httpContext.middleware);
app.use(assignRequestId);
app.use(assignHttpContextRequestId);
app.use( createContext);
app.use(ExpressLogger);
app.use('/demo', routes);
app.use(errorHandler);

initialise()
  .then((v) => {
    app.listen(Number(process.env.PORT), '0.0.0.0', 511, () => {
      Logger.info(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    Logger.error(err);
  });

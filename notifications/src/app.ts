import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler, NotFoundError } from '@h3nrzi-ticket/common';

const app = express();
app.set('trust proxy', true);
app.use(json());

// Add your routes here
// app.use('/api/users', currentUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found');
});

app.use(errorHandler);

export { app };

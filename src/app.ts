import express, { Response, Request } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { limiter } from '@/middlewares/limiter';
import { errorHandler } from '@/middlewares/errorHandler';
import { NotFoundException } from '@/errors/HttpException';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(helmet(), compression(), limiter, express.json());

app.get('/', (_request: Request, response: Response) => {
  response.json({
    message: 'Hello, World!',
  });
});

app.all('*', (request: Request) => {
  throw new NotFoundException(`Route ${request.path} not found`);
});

app.use(errorHandler);

export default app;

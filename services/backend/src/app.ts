import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import formbody from '@fastify/formbody';
import auth from './auth';
import routes from './routes';

const app = Fastify({
  logger: true
});

app.register(cors, {
  origin: true,
  credentials: true,
});

app.register(sensible);

app.register(cookie);

app.register(formbody);

app.register(auth);

app.register(routes);

export default app;

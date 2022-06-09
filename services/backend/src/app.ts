import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import formbody from '@fastify/formbody';
import jwt from '@fastify/jwt';
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

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'secret',
});

app.register(routes);

export default app;

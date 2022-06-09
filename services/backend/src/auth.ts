import jwt from '@fastify/jwt';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

const secret = process.env.JWT_SECRET || 'secret';
const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
const cookieName = process.env.JWT_COOKIE_NAME || 'token';

const auth = (fastify: FastifyInstance) => {
  fastify.register(jwt, {
    secret,
    sign: {
      expiresIn,
    },
    cookie: {
      cookieName,
      signed: false,
    }
  });

  fastify.decorate('auth', async (request: FastifyRequest, reply: FastifyReply) => {
    const token = request.cookies[cookieName];
    if (!token) {
      throw fastify.httpErrors.unauthorized();
    }

    try {
      await request.jwtVerify();
    } catch (err) {
      throw fastify.httpErrors.unauthorized();
    }
  });
};

export default auth;
import { FastifyInstance } from 'fastify';
import authController, { SigninRequest,
    SigninRequestType,
    SignupRequest,
    SignupRequestType } from './controllers/authController';

export default async (fastify: FastifyInstance) => {
  // Auth
  fastify.post<{ Body: SigninRequestType }>('/api/v1/auth/signin', { schema: { body: SigninRequest } }, authController.signin(fastify));
  fastify.post<{ Body: SignupRequestType }>('/api/v1/auth/signup', { schema: { body: SignupRequest } }, authController.signup(fastify));
  // app.post('/api/v1/auth/signout', authController.signout);
};

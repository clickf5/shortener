import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import hmac_sha256 from "crypto-js/hmac-sha256";
import { Static, Type } from '@sinclair/typebox';
import User from "../models/User";

const salt = process.env.SALT || "aksDJK49328-14asakKEIdjf94-9asd";

export const SigninRequest = Type.Object({
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export type SigninRequestType = Static<typeof SigninRequest>;

const signin = (fastify: FastifyInstance) => async (request: FastifyRequest & { body: SigninRequestType }, reply: FastifyReply) => {
  const { email, password } = request.body;

  const [err, existingUser] = await fastify.to(
    User.findOne({ email }).exec(),
  );

  if (err) {
    throw fastify.httpErrors.badRequest(err.message);
  }

  if (!existingUser) {
    throw fastify.httpErrors.badRequest("User not found");
  }

  if (hmac_sha256(password, salt).toString() !== existingUser.password) {
    throw fastify.httpErrors.badRequest("Wrong password");
  }

  const payload = {
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
  };

  const token = await reply.jwtSign(payload);

  reply.setCookie('token', token, {
    domain: 'localhost',
    path: '/',
    httpOnly: true,
    sameSite: true,
  })
    .code(200)
    .send({ status: 'ok' });
};

export const SignupRequest = Type.Object({
  firstName: Type.String({ minLength: 3 }),
  lastName: Type.Optional(Type.String({ minLength: 3 })),
  email: Type.String({ format: "email" }),
  password: Type.String({ minLength: 8 }),
});

export type SignupRequestType = Static<typeof SignupRequest>;

const signup = (fastify: FastifyInstance) => async (request: FastifyRequest & { body: SignupRequestType }, reply: FastifyReply) => {
  const { firstName, lastName, email, password } = request.body;

  const [err, existingUser] = await fastify.to(
    User.findOne({ email }).exec(),
  );

  if (err) {
    throw fastify.httpErrors.badRequest(err.message);
  }

  if (existingUser) {
    throw fastify.httpErrors.badRequest("User already exists");
  }

  const [validationErr] = await fastify.to(
    User.validate({ firstName, lastName, email, password }),
  );

  if (validationErr) {
    throw fastify.httpErrors.badRequest(validationErr.message);
  }

  const user = new User({ firstName, lastName, email, password: hmac_sha256(password, salt).toString() });
  
  const [saveErr] = await fastify.to(
    user.save(),
  );

  if (saveErr) {
    throw fastify.httpErrors.badRequest(saveErr.message);
  }

  reply
    .code(200)
    .send();
}

export default { signin, signup };

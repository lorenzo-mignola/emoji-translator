import { FastifyInstance } from 'fastify';
import { nanoid } from 'nanoid';
import prisma from '../prisma/prismaClient';

interface IHeaders {
  apikey?: string;
}

interface IBody {
  user?: string;
}

const findUserByKey = async (apikey: string) => {
  const user = await prisma.user.findUnique({
    where: {
      apikey
    }
  });
  if (!user) {
    throw new Error('Unable to find user');
  }
  return { apikey: user.apikey };
};

const userExist = async (name: string) => {
  const users = await prisma.user.findMany({
    where: {
      name
    }
  });

  return users.length > 0;
};

const createApiKey = async (name: string) => {
  if (await userExist(name)) {
    throw new Error('User already exists');
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      apikey: nanoid()
    }
  });
  return newUser;
};

async function user(fastify: FastifyInstance) {
  fastify.get<{
    Headers: IHeaders;
  }>('/', async (request, reply) => {
    const { apikey } = request.headers;
    if (!apikey) {
      reply.status(400);
      throw new Error('ApiKey not provided');
    }
    return findUserByKey(apikey);
  });

  fastify.post<{
    Body: IBody;
  }>('/', async (request, reply) => {
    const user = request.body?.user;
    if (!user) {
      reply.status(400);
      throw new Error('User not provided');
    }
    return createApiKey(user);
  });
}

export default user;

import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import prisma from '../prisma/prismaClient';
import { IHeaders } from '../translator';

const ERROR_MESSAGE = 'Wrong user or apikey';

export const authenticate = async (
  request: FastifyRequest<{
    Headers: IHeaders;
  }>,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  const { apikey, user } = request.headers;
  if (!apikey || !user) {
    reply.status(401).send('Not authenticated');
  }
  const userDB = await prisma.user.findUnique({
    where: {
      apikey
    }
  });
  if (!userDB) {
    reply.status(401).send(ERROR_MESSAGE);
  }

  if (userDB?.name != user) {
    reply.status(401).send(ERROR_MESSAGE);
  }

  done();
};

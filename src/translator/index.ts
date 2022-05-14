import { FastifyInstance } from 'fastify';
import { authenticate } from '../auth';
import { translateToEmoji } from './translatorService';

interface IQueryString {
  text?: string;
}

export interface IHeaders {
  user?: string;
  apikey?: string;
}

async function translator(fastify: FastifyInstance) {
  fastify.get<{ Headers: IHeaders; Querystring: IQueryString }>(
    '/',
    {
      preHandler: [authenticate]
    },
    async (request, reply) => {
      return translateToEmoji(request.query.text || '');
    }
  );
}

export default translator;

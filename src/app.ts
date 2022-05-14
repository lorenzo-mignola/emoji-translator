import fastify from 'fastify';
import translator from './translator';
import user from './user';

export default function build(opts = {}) {
  const app = fastify(opts);
  app.register(user, { prefix: 'user' });
  app.register(translator, { prefix: 'translator' });

  return app;
}

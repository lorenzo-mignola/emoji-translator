import fastify from 'fastify';
import user from './user';

export default function build(opts = {}) {
  const app = fastify(opts);
  app.register(user, { prefix: 'user' });

  return app;
}

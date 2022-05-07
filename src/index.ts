import app from './app';

const server = app({
  logger: true,
  prettyPrint: true
});

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

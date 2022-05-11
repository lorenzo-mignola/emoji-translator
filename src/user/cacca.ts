import { nanoid } from 'nanoid';
import { test } from 'tap';
import build from '../app';
import prisma from '../prisma/prismaClient';

test('should throw error', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/user'
  });
  t.equal(response.statusCode, 400, 'returns a status code of 400');
});

test('should throw error', async t => {
  const app = build();

  const response = await app.inject({
    method: 'POST',
    url: '/user'
  });
  t.equal(response.statusCode, 400, 'returns a status code of 400');
});

test('create new user', async t => {
  const name = nanoid();
  const app = build();

  const response = await app.inject({
    method: 'POST',
    url: '/user',
    payload: {
      user: name
    }
  });

  const body = JSON.parse(response.body);
  //@ts-ignore

  t.hasOwnProps(body, ['apikey'], 'body should return new apikey');
  t.ok(body.apikey.length, 'apikey is not null');

  //clean
  await prisma.user.delete({
    where: {
      apikey: body.apikey
    }
  });
});

test('should return the api key', async t => {
  const apikey = '72LaPA3X0DUTcG-_-5yDA';
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/user',
    headers: {
      apikey
    }
  });

  const body = JSON.parse(response.body);
  t.equal(body.apikey, apikey, 'apikey are the same');
});

test('should return error if try to create new api for existing user', async t => {
  const name = 'user';
  const app = build();

  const response = await app.inject({
    method: 'POST',
    url: '/user',
    payload: {
      user: name
    }
  });

  t.equal(response.statusCode, 500, 'returns a status code of 500');
});

test('should return error if try to get an unknown api', async t => {
  const apikey = 'MissinKey';
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/user',
    headers: {
      apikey
    }
  });

  t.equal(response.statusCode, 500, 'returns a status code of 500');
});

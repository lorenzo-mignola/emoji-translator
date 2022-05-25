import { test } from 'tap';
import build from '../app';
import { translateToEmoji } from './translatorService';

test('should return "🏠" given "house"', async t => {
  const plainText = 'house';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, '🏠', 'translation of house');
});

test('should return "my" given "my"', async t => {
  const plainText = 'my';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, 'my', 'translation of "my"');
});

test('should return "my 🏠" given "my house"', async t => {
  const plainText = 'my house';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, 'my 🏠', 'translation of house');
});

test('should return 🐶 given "dog face"', async t => {
  const plainText = 'dog face';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, '🐶', 'dog face');
});

test('should return "a 🐶 live in my 🏠" given "a dog face live in my house"', async t => {
  const plainText = 'a dog face live in my house';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, 'a 🐶 live in my 🏠', 'dog face and house');
});

test('should return "my 👋 is white" given "my waving hand is white"', async t => {
  const plainText = 'my waving hand is white';

  const translatedText = translateToEmoji(plainText);

  t.equal(translatedText, 'my 👋 is white', 'waving hand is white');
});

test('should throw error unauthorized', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator'
  });

  t.equal(response.statusCode, 401, 'returns a status code of 401');
});

test('should throw error unauthorized with wrong apikey and user', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    headers: {
      apikey: 'user',
      user: 'user'
    }
  });

  t.equal(response.statusCode, 401, 'returns a status code of 401');
  t.equal(response.body, 'Wrong user or apikey', 'Apikey error message');
});

test('should throw error unauthorized with correct api but wrong user', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    headers: {
      apikey: '72LaPA3X0DUTcG-_-5yDA',
      user: 'user'
    }
  });

  t.equal(response.statusCode, 401, 'returns a status code of 401');
  t.equal(response.body, 'Wrong user or apikey', 'Apikey error message');
});

const authHeaders = {
  apikey: '72LaPA3X0DUTcG-_-5yDA',
  user: 'test'
};

test('should pass the auth', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    headers: authHeaders
  });

  t.equal(response.statusCode, 200, 'auth');
});

test('should return "" given ""', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    query: {
      text: ''
    },
    headers: authHeaders
  });
  t.equal(response.statusCode, 200, 'auth');
  t.equal(response.body, '', 'response');
});

test('should return "hi" given "hi"', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    query: {
      text: 'hi'
    },
    headers: authHeaders
  });
  t.equal(response.statusCode, 200, 'auth');
  t.equal(response.body, 'hi', 'response');
});

test('should return "OMG!!! The 🏠 is on 🔥 and the 🐈 is eating all the 🍍!" given "OMG!!! The house is on fire and the cat is eating all the pineapple!"', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    query: {
      text: 'OMG!!! The house is on fire and the cat is eating all the pineapple!'
    },
    headers: authHeaders
  });
  t.equal(response.statusCode, 200, 'auth');
  t.equal(
    response.body,
    'OMG!!! The 🏠 is on 🔥 and the 🐈 is eating all the 🍍!',
    'response'
  );
});

test('should return "1️⃣ 🍍!" given "1 pineapple!"', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    query: {
      text: '1 pineapple!'
    },
    headers: authHeaders
  });
  t.equal(response.statusCode, 200, 'auth');
  t.equal(response.body, '1️⃣ 🍍!', 'response');
});

test('should return "many 🍍!" given "many pineapple!"', async t => {
  const app = build();

  const response = await app.inject({
    method: 'GET',
    url: '/translator',
    query: {
      text: 'many pineapple!'
    },
    headers: authHeaders
  });
  t.equal(response.statusCode, 200, 'auth');
  t.equal(response.body, 'many 🍍!', 'response');
});

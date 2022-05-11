import { test } from 'tap';
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

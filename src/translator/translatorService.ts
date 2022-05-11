import emojiDictionary from './emoji.json';
import { Emoji } from './types/Emoji';

const isTranslated = (originalWord: string, translatedWord: string) =>
  translatedWord !== originalWord;

const joinWords = (actualWord: string, nextWord: string) =>
  `${actualWord} ${nextWord}`;

const notNull = (element: any) => null != element;

const translateWord = (word: string) => {
  const emoji = (emojiDictionary as Emoji)[word];

  if (emoji) {
    return emoji.emoji;
  }

  return word;
};

const translateTwoWord = (actualWord: string, nextWord: string) =>
  translateWord(joinWords(actualWord, nextWord));

const translate = (splitted: string[]) => (word: string, index: number) => {
  const nextWord = splitted[index + 1];
  const previousWord = splitted[index - 1];

  if (!nextWord) {
    const twoWorldEmojiPrevious = translateTwoWord(previousWord, word);
    return isTranslated(joinWords(previousWord, word), twoWorldEmojiPrevious)
      ? null
      : translateWord(word);
  }

  const twoWorldEmoji = translateTwoWord(word, nextWord);

  if (isTranslated(joinWords(word, nextWord), twoWorldEmoji)) {
    return twoWorldEmoji;
  }

  return translateWord(word);
};

export const translateToEmoji = (plainText: string) => {
  const splittedText = plainText.split(' ');
  const translateFunction = translate(splittedText);
  return splittedText.map(translateFunction).filter(notNull).join(' ');
};

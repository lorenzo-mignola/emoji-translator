export type Emoji = Record<string, EmojiChar>;

interface EmojiChar {
  emoji: string;
  description: string;
  category: string;
  aliases: string[];
  tags: string[];
  unicode_version: string;
  ios_version: string;
}

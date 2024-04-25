// https://ko.vitejs.dev/guide/assets#importing-asset-as-string
import blockedWords from '@assets/blockedWords.txt?raw';

const jsCodeRegex = /[<>(){}[\]]/g;
const eventHandlerRegex = /\bon(?:load|click|mouseover|keydown)\s*=/gi;
const jsProtocolUrlRegex = /javascript:/gi;
const urlRegex =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

const checkUrl = (text: string) => {
  try {
    // eslint-disable-next-line no-new
    new URL(text);
  } catch (error) {
    return false;
  }

  return true;
};

export const validInputText = (str: string) => {
  const combinedRegex = new RegExp(
    `(${jsCodeRegex.source}|${eventHandlerRegex.source}|${jsProtocolUrlRegex.source}|${urlRegex.source})`,
    'gi',
  );

  return combinedRegex.test(str) || checkUrl(str);
};

export const isUrl = (str: string) => urlRegex.test(str) || checkUrl(str);

export const isIncludeBlockedWords = (str: string) => {
  try {
    const profanityList = blockedWords
      .split('\n')
      .map((word: string) => word.replace(/\s/g, ''))
      .filter((word: string) => word !== '');

    const regexPattern = new RegExp(`${profanityList.join('|')}`, 'gi');

    return regexPattern.test(str.replace(/\s/g, ''));
  } catch (err) {
    return true;
  }
};

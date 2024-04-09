const htmlTagRegex = /<|>|&/g;
const jsCodeRegex = /[(){}[\]]/g;
const eventHandlerRegex = /\bon(?:load|click|mouseover|keydown)\s*=/gi;
const jsProtocolUrlRegex = /javascript:/gi;

const isUrl = (text: string) => {
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
    `(${htmlTagRegex.source}|${jsCodeRegex.source}|${eventHandlerRegex.source}|${jsProtocolUrlRegex.source})`,
    'gi',
  );

  return combinedRegex.test(str) || isUrl(str);
};

export const isIncludeBlockedWords = (str: string) => false;

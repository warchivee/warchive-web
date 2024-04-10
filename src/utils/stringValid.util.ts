const jsCodeRegex = /[<>(){}[\]]/g;
const eventHandlerRegex = /\bon(?:load|click|mouseover|keydown)\s*=/gi;
const jsProtocolUrlRegex = /javascript:/gi;
const urlRegex =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi;

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
    `(${jsCodeRegex.source}|${eventHandlerRegex.source}|${jsProtocolUrlRegex.source}|${urlRegex.source})`,
    'gi',
  );

  return combinedRegex.test(str) || isUrl(str);
};

export const isIncludeBlockedWords = (str: string) => false;

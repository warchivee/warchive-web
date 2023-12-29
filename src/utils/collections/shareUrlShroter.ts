import { WataIdType, WataType } from '@utils/watas/index.type';
import { CollectionType } from './index.type';

const BASE62CODES =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MAX_COLLECTION_ITEMS_COUNT = 1000;

// 2진수 -> 62진수
const binaryToBase62 = (binaryString: string) => {
  let num = BigInt(`0b${binaryString}`);

  let result = '';
  while (num > 0n) {
    const remainder = num % 62n;
    result = BASE62CODES.charAt(Number(remainder)) + result;
    num /= 62n;
  }

  return result;
};

// 62진수 -> 2진수
const base62ToBinary = (base62String: string) => {
  let result = BigInt(0);

  for (let i = 0; i < base62String.length; i += 1) {
    const char = base62String.charAt(i);
    const charValue = BigInt(BASE62CODES.indexOf(char));
    result = result * 62n + charValue;
  }

  return result.toString(2);
};

export const getSharedCollectionShortUrl = (collection: CollectionType) => {
  const { title, items } = collection;

  const binaryNumbers = Array.from(
    { length: MAX_COLLECTION_ITEMS_COUNT },
    () => 0,
  );

  // 2진수로 데이터가 있고 없음을 표현하기 위해 항상 맨 앞 자리는 1로 만들어줌.
  binaryNumbers[0] = 1;

  items.forEach((item: WataIdType) => {
    binaryNumbers[item] = 1;
  });

  const queryString = `p=${binaryToBase62(binaryNumbers.join(''))}t=${title}`;

  return `${window.location.origin}/shared?${queryString}`;
};

export const getSharedCollectionToUrl = (
  allWatas: WataType[],
  queryString: string,
) => {
  const splitQueryString = queryString.split('t=');

  if (!queryString || splitQueryString.length !== 2) {
    return { title: '', items: [] };
  }

  const itemsArray = base62ToBinary(splitQueryString[0]).split('') || [];

  return {
    title: splitQueryString[1],
    items: allWatas.filter((wata: WataType) => itemsArray[wata.id] === '1'),
  };
};

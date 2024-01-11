import { selector } from 'recoil';
import { ValueLabelType } from 'src/types/common.type';
import { KeywordByCategoryType } from 'src/types/serchKeyword.type';
import testData from '@assets/testData.json';
import { WataType } from 'src/types/wata.type';
import { allWataListSelector } from './wata.atom';

// todo: api를 valueLabelType 으로 return 해주도록 수정할 예정
const findKeywordsByCategory = (
  watas: WataType[],
  category: string,
  allKeywords: {
    category_list: string[];
    genre_list: string[];
    platform_list: string[];
    keyword_list: string[];
  },
) => {
  const result: {
    genres: ValueLabelType[];
    platforms: ValueLabelType[];
    keywords: ValueLabelType[];
  } = { genres: [], platforms: [], keywords: [] };

  const {
    genre_list: genres,
    platform_list: platforms,
    keyword_list: keywords,
  } = allKeywords;

  genres?.forEach((value: string) => {
    if (
      watas?.some(
        (wata: WataType) =>
          category === wata.category.label && wata.genre.label === value,
      )
    ) {
      result.genres.push({ value: `genre-${value}`, label: value });
    }
  });

  platforms?.forEach((value: string) => {
    if (
      watas?.some(
        (wata: WataType) =>
          category === wata.category.label &&
          wata.platforms.some((item: ValueLabelType) => item.label === value),
      )
    ) {
      result.platforms.push({ value: `platform-${value}`, label: value });
    }
  });

  keywords?.forEach((value: string) => {
    if (
      watas?.some(
        (wata: WataType) =>
          category === wata.category.label &&
          wata.keywords.some((item: ValueLabelType) => item.label === value),
      )
    ) {
      result.keywords.push({ value: `keyword-${value}`, label: value });
    }
  });

  return result;
};

export const keywordListSelector = selector<KeywordByCategoryType[]>({
  key: 'keywordListSelector',
  get: async ({ get }) => {
    const watas = get(allWataListSelector);

    const { allKeyword_list: allKeywords } = testData;
    const {
      category_list: categorys,
      genre_list: genres,
      platform_list: platforms,
      keyword_list: keywords,
    } = allKeywords;

    const keywordList: KeywordByCategoryType[] = categorys?.map(
      (name: string) => ({
        value: `category-${name}`,
        label: name,
        ...findKeywordsByCategory(watas, name, allKeywords),
      }),
    );

    keywordList.unshift({
      value: 'category-전체',
      label: '전체',
      genres: genres.map((value: string) => ({
        label: value,
        value: `genre-${value}`,
      })),
      platforms: platforms.map((value: string) => ({
        label: value,
        value: `platform-${value}`,
      })),
      keywords: keywords.map((value: string) => ({
        label: value,
        value: `keyword-${value}`,
      })),
    });

    return keywordList;
  },
});

export default keywordListSelector;

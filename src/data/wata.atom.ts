import { selector } from 'recoil';
import { WataType } from '@utils/common.type';
import testData from './testData.json';

const makeValueLabelList = (datas: string[]) =>
  datas?.map((item: string) => ({
    value: `keyword-${item}`,
    label: item,
  }));

export const wataListState = selector<WataType[]>({
  key: 'watasState',
  get: async () => {
    const { wata_list: datas } = testData;

    return datas?.map(
      ({
        id,
        title,
        creator,
        category,
        genre,
        keywords,
        cautions,
        platforms,
        thumnail,
      }) => ({
        id,
        title,
        creator,
        category: {
          value: `category-${category}`,
          label: category,
        },
        genre: {
          value: `genre-${genre}`,
          label: genre,
        },
        keywords: makeValueLabelList(keywords),
        cautions: makeValueLabelList(cautions),
        platforms: platforms?.map(
          ({ name, url }: { name: string; url: string }) => ({
            value: `platform-${name}`,
            label: name,
            url,
          }),
        ),
        thumbnail: thumnail,
      }),
    );
  },
});

export default wataListState;

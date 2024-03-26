import { WataType } from 'src/types/wata.type';
import { selector } from 'recoil';
import { wataListSelector } from './wata.atom';
import { searchKeywordAtom } from './search.atom';

export const searchWatasSelector = selector<WataType[]>({
  key: 'searchWatasSelector',
  get: ({ get }) => {
    const searchKeywords = get(searchKeywordAtom);
    const { watas } = get(wataListSelector);

    const { searchInput, category, genres, platforms, keywords } =
      searchKeywords;

    return watas?.filter((wata: WataType) => {
      const pass = {
        searchInput: true,
        category: true,
        genres: true,
        platforms: true,
        keywords: true,
      };

      if (searchInput && searchInput?.replace(' ', '') !== '') {
        pass.searchInput =
          wata.title.includes(searchInput) ||
          wata.creators.includes(searchInput);
      }

      if (category && category.id !== 0) {
        pass.category = wata.category.id === +category.id;
      }

      if (genres && genres.length !== 0) {
        pass.genres = genres?.some((g) => wata.genre.id === g.id);
      }

      if (platforms && platforms.length !== 0) {
        const platformIds = new Set(platforms?.map((p) => p.id));
        pass.platforms = wata.platforms?.some((wp) => platformIds.has(wp.id));
      }

      if (keywords && keywords.length !== 0) {
        const keywordIds = new Set(keywords?.map((p) => p.id));
        pass.keywords = wata.keywords?.some((wp) => keywordIds.has(wp.id));
      }

      return (
        pass.searchInput &&
        pass.category &&
        pass.genres &&
        pass.platforms &&
        pass.keywords
      );
    });
  },
});

export default searchWatasSelector;

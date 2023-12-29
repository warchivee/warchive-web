import { ValueLabelType } from '@utils/common.type';

export interface KeywordByCategoryType extends ValueLabelType {
  genres: ValueLabelType[];
  platforms: ValueLabelType[];
  keywords: ValueLabelType[];
}

export interface SearchKeywordsType {
  searchInput: string;
  category: ValueLabelType;
  genres: ValueLabelType[];
  platforms: ValueLabelType[];
  keywords: ValueLabelType[];
}

export type SearchKeywordsKeyType = 'genres' | 'platforms' | 'keywords';

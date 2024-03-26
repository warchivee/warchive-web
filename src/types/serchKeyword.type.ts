import { KeywordType } from './wata.type';

export interface SearchKeywordsType {
  searchInput: string;
  category: KeywordType;
  genres: KeywordType[];
  platforms: KeywordType[];
  keywords: KeywordType[];
}

export type SearchKeywordsKeyType = 'genres' | 'platforms' | 'keywords';

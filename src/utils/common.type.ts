export interface ValueLabelType {
  value: string;
  label?: string;
}

export interface SearchKeywordType {
  searchInput: string;
  category: ValueLabelType;
  genres: ValueLabelType[];
  platforms: ValueLabelType[];
  keywords: ValueLabelType[];
}

export type KeywordType = 'genres' | 'platforms' | 'keywords';

export interface CategoryType extends ValueLabelType {
  genres: ValueLabelType[];
  platforms: ValueLabelType[];
  keywords: ValueLabelType[];
}

export interface WataType {
  id: number;
  title: string;
  creator: string;
  category: ValueLabelType;
  genre: ValueLabelType;
  keywords: ValueLabelType[];
  cautions: ValueLabelType[];
  platforms: {
    value: string;
    label: string;
    url: string;
  }[];
  thumbnail: string;
}

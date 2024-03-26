export interface WataListType {
  watas: WataType[];
  categories: KeywordListType[];
}

export interface KeywordListType {
  id: number;
  name: string;
  genres: KeywordType[];
  keywords: KeywordType[];
  platforms: KeywordType[];
}

export interface KeywordType {
  id: number;
  name: string;
}

export interface PlatformType extends KeywordType {
  url: string;
}

export type WataIdType = number;

export interface WataType {
  id: WataIdType;
  title: string;
  creators: string;
  category: KeywordType;
  genre: KeywordType;
  keywords: KeywordType[];
  cautions: KeywordType[];
  platforms: PlatformType[];
  thumbnail_card: string;
  thumbnail_book: string;
}

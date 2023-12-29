import { ValueLabelType } from '@utils/common.type';

export interface WataType {
  id: WataIdType;
  title: string;
  creator: string;
  category: ValueLabelType;
  genre: ValueLabelType;
  keywords: ValueLabelType[];
  cautions: ValueLabelType[];
  platforms: PlatformType[];
  thumbnail: string;
}

export interface PlatformType extends ValueLabelType {
  url: string;
}

export type WataIdType = number;

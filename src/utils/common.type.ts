export interface ValueLabelType {
  value: string;
  label: string;
}

export interface CategoryType extends ValueLabelType {
  genres: ValueLabelType[];
  platforms: ValueLabelType[];
  keywords: ValueLabelType[];
}

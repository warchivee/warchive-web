export interface ValueLabelType<T> {
  value: T;
  label?: string;
}

export interface CategoryType extends ValueLabelType<string> {
  genres: ValueLabelType<string>[];
  platforms: ValueLabelType<string>[];
  keywords: ValueLabelType<string>[];
}

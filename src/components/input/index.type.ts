import { FontSizeType } from '@components/text/index.type';

export interface InputProps {
  type?: 'default' | 'text' | 'search';
  style?: 'outline' | 'underline';
  value: string;
  placeholder?: string;
  size?: FontSizeType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

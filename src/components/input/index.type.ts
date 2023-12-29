import { FontSizeType } from '@components/text/index.type';

export interface InputProps {
  type?: 'default' | 'text' | 'search';
  border?: 'outline' | 'underline';
  value: string;
  placeholder?: string;
  size?: FontSizeType;
  maxLength?: number;
  onChange?: (input: string) => void;
}

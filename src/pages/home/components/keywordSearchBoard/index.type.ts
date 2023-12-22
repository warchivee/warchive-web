import { FontSizeType } from '@components/text/index.type';
import { ValueLabelType } from '@utils/common.type';

export interface BubbleProps extends ValueLabelType {
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BubblesPoprs {
  title: string;
  bubbles: ValueLabelType[];
  handleChange?: (checked: boolean, bubble: ValueLabelType) => void;
}
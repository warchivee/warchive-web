import { FontSizeType } from '@components/text/index.type';
import { ValueLabelType } from '@utils/common.type';

export interface BubbleProps extends ValueLabelType<string> {
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BubblesPoprs {
  title: string;
  bubbles: ValueLabelType<string>[];
  handleChange?: (checked: boolean, bubble: ValueLabelType<string>) => void;
}

import { FontSizeType } from '@components/text/index.type';
import { KeywordType, ValueLabelType } from '@utils/common.type';

export interface CheckKeywordBubbleProps extends ValueLabelType {
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckKeywordBubblesProps {
  title: string;
  bubbles: ValueLabelType[];
  bubbleType: KeywordType;
  selectedBubbles: ValueLabelType[];
  handleChange?: (bubbletype: KeywordType, bubble: ValueLabelType) => void;
}

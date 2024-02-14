import { FontSizeType } from '@components/CommonComponents/text/index.type';
import { ValueLabelType } from 'src/types/common.type';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';

export interface CheckKeywordBubbleProps extends ValueLabelType {
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckKeywordBubblesProps {
  title: string;
  bubbles: ValueLabelType[];
  bubbleType: SearchKeywordsKeyType;
  selectedBubbles: ValueLabelType[];
  handleChange?: (
    bubbletype: SearchKeywordsKeyType,
    bubble: ValueLabelType,
  ) => void;
}

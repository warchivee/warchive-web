import { FontSizeType } from '@components/text/index.type';
import { ValueLabelType } from '@utils/common.type';
import { SearchKeywordsKeyType } from '@utils/searchKeywords/index.type';

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

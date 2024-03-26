import { FontSizeType } from '@components/CommonComponents/text/index.type';
import { SearchKeywordsKeyType } from 'src/types/serchKeyword.type';
import { KeywordType } from 'src/types/wata.type';

export interface CheckKeywordBubbleProps {
  value: string;
  label: string;
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckKeywordBubblesProps {
  title: string;
  bubbles: KeywordType[];
  bubbleType: SearchKeywordsKeyType;
  selectedBubbles: KeywordType[];
  handleChange?: (
    bubbletype: SearchKeywordsKeyType,
    bubble: KeywordType,
  ) => void;
}

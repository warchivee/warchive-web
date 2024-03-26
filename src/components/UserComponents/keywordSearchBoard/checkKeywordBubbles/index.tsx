import { Title } from '@components/CommonComponents/text';
import { KeywordType } from 'src/types/wata.type';
import { CheckKeywordBubblesProps } from '../index.type';
import CheckKeywordBubble from '../checkKeywordBubble';

export default function CheckKeywordBubbles({
  title,
  bubbles = [],
  bubbleType,
  selectedBubbles = [],
  handleChange = () => {},
}: CheckKeywordBubblesProps) {
  return (
    <div className="bubbles">
      <Title type="h5" color="french-lilac">
        {title}
      </Title>
      <div className="grid">
        {bubbles?.map((keyword: KeywordType) => (
          <CheckKeywordBubble
            key={`${bubbleType}-${keyword.id}`}
            value={`${bubbleType}-${keyword.id}`}
            label={keyword.name}
            checked={selectedBubbles.some(
              (selectedBubble) => selectedBubble.id === keyword.id,
            )}
            onChange={() => handleChange(bubbleType, keyword)}
          />
        ))}
      </div>
    </div>
  );
}

import { Title } from '@components/text';
import { ValueLabelType } from '@utils/common.type';
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
      <Title type="h4" color="french-lilac">
        {title}
      </Title>
      <div className="grid">
        {bubbles?.map((bubble: ValueLabelType) => (
          <CheckKeywordBubble
            key={`bubble-${bubble.value}`}
            value={bubble.value}
            label={bubble.label}
            checked={selectedBubbles.some(
              (selectedBubble) => selectedBubble.value === bubble.value,
            )}
            onChange={() => handleChange(bubbleType, bubble)}
          />
        ))}
      </div>
    </div>
  );
}

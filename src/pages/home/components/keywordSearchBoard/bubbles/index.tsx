import { Title } from '@components/text';
import { ValueLabelType } from '@utils/common.type';
import { BubblesPoprs } from '../index.type';
import Bubble from '../bubble';

export default function Bubbles({
  title,
  bubbles,
  handleChange = () => {},
}: BubblesPoprs) {
  return (
    <div className="bubbles">
      <Title type="h4" color="french-lilac">
        {title}
      </Title>
      <div className="grid">
        {bubbles?.map((bubble: ValueLabelType<string>) => (
          <Bubble
            key={bubble.value}
            value={bubble.value}
            label={bubble.label}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e.target.checked, bubble);
            }}
          />
        ))}
      </div>
    </div>
  );
}

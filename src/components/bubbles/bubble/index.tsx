import Icon from '@components/icon';
import { Text } from '@components/text';
import { FontSizeType } from '@components/text/index.type';
import classNames from 'classnames';

interface BubbleProps {
  value?: string;
  label?: string;
  type?: 'default' | 'border' | 'remove';
  size?: FontSizeType;
}

export default function Bubble({
  value = 'keyword-1',
  label = '키워드',
  type = 'default',
  size = 'normal',
}: BubbleProps) {
  return (
    <div className="bubble">
      <input type="checkbox" name={value} id={value} />
      <label htmlFor={value} className={classNames({ [`${type}`]: type })}>
        <Text size={size}>{label}</Text>
        {type === 'remove' && <Icon type="xmark" size={size} color="white" />}
      </label>
    </div>
  );
}

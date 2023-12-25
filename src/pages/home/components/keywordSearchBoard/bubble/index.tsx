import Icon from '@components/icon';
import { Text } from '@components/text';
import classNames from 'classnames';
import { BubbleProps } from '../index.type';

export default function Bubble({
  value = 'keyword-1',
  label = '키워드',
  type = 'default',
  size = 'normal',
  onChange = () => {},
}: BubbleProps) {
  return (
    <div className="bubble">
      <input type="checkbox" name={value} id={value} onChange={onChange} />
      <label htmlFor={value} className={classNames({ [`${type}`]: type })}>
        <Text size={size}>{label}</Text>
        {type === 'remove' && (
          <Icon type="xmark" size={size} color="french-lilac" />
        )}
      </label>
    </div>
  );
}

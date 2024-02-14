import Icon from '@components/CommonComponents/icon';
import { Text } from '@components/CommonComponents/text';
import classNames from 'classnames';
import { CheckKeywordBubbleProps } from '../index.type';

export default function CheckKeywordBubble({
  value = 'keyword-1',
  label = '키워드',
  type = 'default',
  size = 'normal',
  checked = false,
  onChange = () => {},
}: CheckKeywordBubbleProps) {
  return (
    <div className="bubble">
      <input
        type="checkbox"
        name={value}
        id={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={value} className={classNames({ [`${type}`]: type })}>
        <Text size={size}>{label}</Text>
        {type === 'remove' && (
          <Icon type="xmark" size={size} color="french-lilac" />
        )}
      </label>
    </div>
  );
}

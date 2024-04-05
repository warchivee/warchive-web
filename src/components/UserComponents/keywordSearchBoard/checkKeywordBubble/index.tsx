import { Text } from '@components/CommonComponents/text';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CheckKeywordBubbleProps } from '../index.type';

export default function CheckKeywordBubble({
  value = '',
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
        {type === 'remove' && <FontAwesomeIcon icon={faXmark} />}
      </label>
    </div>
  );
}

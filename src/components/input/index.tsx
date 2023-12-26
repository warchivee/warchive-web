import classNames from 'classnames';

import Icon from '@components/icon';
import { InputProps } from './index.type';

export default function Input({
  type = 'text',
  style = 'outline',
  value,
  placeholder,
  size = 'normal',
  onChange = () => {},
}: InputProps) {
  return (
    <div className="input">
      {type === 'search' && <Icon type="search" size={size} color="purple" />}
      <input
        type={type}
        className={classNames(
          { [`${style}`]: style },
          { [`font-size-${size}`]: size },
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

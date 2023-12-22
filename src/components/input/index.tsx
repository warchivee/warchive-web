import Icon from '@components/icon';
import { FontSizeType } from '@components/text/index.type';
import classNames from 'classnames';

interface InputProps {
  type?: 'default' | 'text' | 'search';
  style?: 'outline' | 'underline';
  value: string;
  placeholder?: string;
  size?: FontSizeType;
  onChange?: () => void;
}

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
      <input
        type={type}
        className={classNames(
          { outline: style === 'outline' },
          { underline: style === 'underline' },
          { [`font-size-${size}`]: size },
        )}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === 'search' && <Icon type="search" size={size} color="purple" />}
    </div>
  );
}

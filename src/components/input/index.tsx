import classNames from 'classnames';

import Icon from '@components/icon';
import Button from '@components/button';
import { InputProps } from './index.type';

export default function Input({
  type = 'text',
  border = 'outline',
  isEnterButton = false,
  onEnter = () => {},
  value,
  placeholder,
  size = 'normal',
  maxLength = 100,
  onChange = () => {},
}: InputProps) {
  return (
    <div className="input">
      {type === 'search' && <Icon type="search" size={size} color="purple" />}
      <input
        type={type}
        maxLength={maxLength}
        name={`add-data-${value}`}
        id={`add-data-${value}`}
        className={classNames(
          { [`${border}`]: border },
          { [`font-size-${size}`]: size },
        )}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter();
          }
        }}
      />

      <div className="reset">
        <Button
          icon="xmark"
          onClick={() => {
            onChange('');
          }}
        />
      </div>

      {isEnterButton && (
        <Button onClick={() => onEnter()} background="selago">
          검색
        </Button>
      )}
    </div>
  );
}

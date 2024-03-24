import classNames from 'classnames';

import Icon from '@components/CommonComponents/icon';
import Button from '@components/CommonComponents/button';
import { FontSizeType } from '../text/index.type';

export default function Input({
  type = 'text',
  border = 'outline',
  isEnterButton = false,
  onEnter = () => {},
  value,
  placeholder,
  size = 'normal',
  isResetButton = true,
  maxLength = 2500,
  onChange = () => {},
}: {
  type?: 'default' | 'text' | 'search';
  border?: 'outline' | 'underline';
  value: string;
  placeholder?: string;
  size?: FontSizeType;
  maxLength?: number;
  isEnterButton?: boolean;
  isResetButton?: boolean;
  onEnter?: () => void;
  onChange?: (input: string) => void;
}) {
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

      {isResetButton && (
        <div className="reset">
          <Button
            icon="xmark"
            onClick={() => {
              onChange('');
            }}
          />
        </div>
      )}

      {isEnterButton && (
        <Button onClick={() => onEnter()} background="selago">
          검색
        </Button>
      )}
    </div>
  );
}

import classNames from 'classnames';

import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton } from '@mui/joy';
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
  width = '',
}: {
  type?: 'default' | 'text' | 'search' | 'number';
  border?: 'outline' | 'underline';
  value: string | number;
  placeholder?: string;
  size?: FontSizeType;
  maxLength?: number;
  isEnterButton?: boolean;
  isResetButton?: boolean;
  onEnter?: () => void;
  onChange?: (input: string) => void;
  width?: string;
}) {
  return (
    <div className="input">
      {type === 'search' && <FontAwesomeIcon icon={faMagnifyingGlass} />}
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
        style={
          width
            ? {
                width,
              }
            : {}
        }
      />

      {isResetButton && (
        <div className="reset">
          <IconButton
            onClick={() => {
              onChange('');
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </IconButton>
        </div>
      )}

      {isEnterButton && <Button onClick={() => onEnter()}>검색</Button>}
    </div>
  );
}

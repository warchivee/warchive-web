import classNames from 'classnames';

import { renderLabel } from '@components/text/index.util';

import { ButtonProps } from './index.type';

export default function Button({
  label = '',
  labelColor = 'white',
  color = 'purple',
  type = 'round',
  size = 'normal',
  width = 'defult',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'button',
        { [`background-${color}`]: color },
        { [`border-${type}`]: type },
      )}
      onClick={onClick}
      style={{
        width: width === 'full' ? '100%' : 'max-content',
      }}
    >
      {renderLabel(size, label, labelColor)}
    </button>
  );
}

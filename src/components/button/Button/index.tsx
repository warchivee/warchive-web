import classNames from 'classnames';

import { Text } from '@components/text';
import { ButtonProps } from './index.type';

export default function Button({
  children,
  labelColor = 'white',
  color = 'purple',
  type = 'round',
  size = 'normal',
  width = 'default',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'button',
        { [`background-${color}`]: color },
        { [`border-${type}`]: type },
        { 'full-width': width === 'full' },
      )}
      onClick={onClick}
    >
      {children && (
        <Text color={labelColor} size={size}>
          {children}
        </Text>
      )}
    </button>
  );
}

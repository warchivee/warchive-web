import classNames from 'classnames';

import Icon from '@components/icon';
import { Text } from '@components/text';

import { ButtonProps } from './index.type';

export default function Button({
  children,
  icon = undefined,
  iconColor = 'purple',
  labelColor = 'black',
  background = undefined,
  type = 'default',
  size = 'normal',
  align = 'default',
  width = 'default',
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'icon-button',
        { [`${align}`]: align },
        { [`background-${background}`]: background },
        { 'only-icon': !children && icon },
        { [`border-${type}`]: type },
        { 'full-width': width === 'full' },
      )}
      onClick={onClick}
    >
      {icon && <Icon type={icon} color={iconColor} size={size} />}
      {children && (
        <Text size={size} color={labelColor}>
          {children}
        </Text>
      )}
    </button>
  );
}

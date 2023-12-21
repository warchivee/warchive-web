import classNames from 'classnames';

import Icon from '@components/icon';

import { Text } from '@components/text';
import { IconButtonProps } from './index.type';

export default function IconButton({
  children,
  icon = undefined,
  iconColor = 'selago',
  labelColor = 'selago',
  background = 'purple',
  size = 'normal',
  align = 'default',
  onClick = () => {},
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'icon-button',
        { [`${align}`]: align },
        { [`background-${background}`]: background },
        { 'only-icon': !children && icon },
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

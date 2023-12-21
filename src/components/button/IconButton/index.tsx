import classNames from 'classnames';

import { IconButtonProps } from './index.type';
import { ColorType } from '@utils/color';

import { Text } from '@components/text';
import Icon from '@components/icon';

const labelRenderer = (size: string, value: string, color: ColorType) =>
  size === 'normal' ? (
    <Text.Title type="h4" value={value} color={color} />
  ) : (
    <Text.Caption value={value} color={color} />
  );

export default function IconButton({
  icon = undefined,
  iconColor = 'black',
  label = undefined,
  labelColor = 'black',
  size = 'normal',
  align = 'default',
  onClick = () => {},
}: IconButtonProps) {
  return (
    <button
      type="button"
      className={classNames('icon-button', { [`${align}`]: align })}
      onClick={onClick}
    >
      {icon && <Icon type={icon} color={iconColor} size={size} />}
      {label && labelRenderer(size, label, labelColor)}
    </button>
  );
}

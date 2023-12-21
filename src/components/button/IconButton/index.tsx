import classNames from 'classnames';

import Icon from '@components/icon';

import { renderLabel } from '@components/text/index.util';
import { IconButtonProps } from './index.type';

export default function IconButton({
  icon = undefined,
  iconColor = 'black',
  label = '',
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
      {renderLabel(size, label, labelColor)}
    </button>
  );
}

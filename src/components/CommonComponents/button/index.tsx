import classNames from 'classnames';

import Icon from '@components/CommonComponents/icon';
import { Text } from '@components/CommonComponents/text';

import Loader from '@components/CommonComponents/loader';
import { ButtonProps } from './index.type';

export default function Button({
  children,
  icon = undefined,
  iconColor = 'purple',
  labelColor = 'black',
  background = undefined,
  border = 'default',
  size = 'normal',
  align = 'default',
  width = 'default',
  isLoading = false,
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(
        'button',
        { [`${align}`]: align },
        { [`background-${background}`]: background },
        { 'only-icon': !children && icon },
        { [`border-${border}`]: border },
        { 'full-width': width === 'full' },
      )}
      onClick={onClick}
    >
      {icon && (
        <div className="icon-box">
          <Icon type={icon} color={iconColor} size={size} />
        </div>
      )}
      {children && (
        <Text size={size} color={labelColor}>
          {children}
        </Text>
      )}
      {isLoading && <Loader />}
    </button>
  );
}

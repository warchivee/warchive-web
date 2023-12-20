import classNames from 'classnames';

import AnglesUp from '@assets/icons/angles-up.svg?react';
import Bars from '@assets/icons/bars.svg?react';
import Download from '@assets/icons/download.svg?react';
import Facebook from '@assets/icons/facebook.svg?react';
import Instagram from '@assets/icons/instagram.svg?react';
import Mail from '@assets/icons/mail.svg?react';
import Minus from '@assets/icons/minus.svg?react';
import Plus from '@assets/icons/plus.svg?react';
import Question from '@assets/icons/question.svg?react';
import Star from '@assets/icons/star.svg?react';
import Twitter from '@assets/icons/twitter.svg?react';
import Write from '@assets/icons/write.svg?react';
import Xmark from '@assets/icons/xmark.svg?react';

import { Text } from '@components/text';
import { ColorCodes, ColorType } from 'src/styles/utils/color';

type IconType =
  | 'angles-up'
  | 'bars'
  | 'download'
  | 'facebook'
  | 'instagram'
  | 'mail'
  | 'minus'
  | 'plus'
  | 'question'
  | 'star'
  | 'twitter'
  | 'write'
  | 'xmark';

interface IconButtonProps {
  icon?: IconType;
  iconColor?: ColorType;
  label?: string;
  labelColor?: ColorType;
  align?: 'default' | 'reverse';
  size?: 'normal' | 'small';
  onClick?: () => void;
}

const iconSize = {
  normal: 16,
  small: 12,
};

const icons: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'angles-up': AnglesUp,
  bars: Bars,
  download: Download,
  facebook: Facebook,
  instagram: Instagram,
  mail: Mail,
  minus: Minus,
  plus: Plus,
  question: Question,
  star: Star,
  twitter: Twitter,
  write: Write,
  xmark: Xmark,
};

const labelRenderer = (size: string, value: string, color: ColorType) =>
  size === 'normal' ? (
    <Text.Title type="h4" value={value} color={color} />
  ) : (
    <Text.Caption value={value} color={color} />
  );

export function IconButton({
  icon = undefined,
  iconColor = 'black',
  label = undefined,
  labelColor = 'black',
  align = 'default',
  size = 'normal',
  onClick = () => {},
}: IconButtonProps) {
  const IconComponent = icon ? icons[icon] : null;

  return (
    <button
      type="button"
      className={classNames('icon-button', { [`${align}`]: align })}
      onClick={onClick}
    >
      {IconComponent && (
        <IconComponent
          fill={ColorCodes[iconColor]}
          height={iconSize[size]}
          width={iconSize[size]}
        />
      )}
      {label ? labelRenderer(size, label, labelColor) : null}
    </button>
  );
}

export default IconButton;

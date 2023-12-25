import { ColorCodes } from '@utils/color';
import { FontSizeType } from '@components/text/index.type';

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
import Search from '@assets/icons/search.svg?react';

import { IconType, IconProps } from './index.type';

const IconSizeCodes: Record<FontSizeType, number> = {
  small: 12,
  normal: 16,
  big: 18,
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
  search: Search,
};

export default function Icon({ type, color, size }: IconProps) {
  const IconComponent = icons[type];

  return (
    <IconComponent
      className="icon"
      fill={ColorCodes[color]}
      height={IconSizeCodes[size]}
      width={IconSizeCodes[size]}
    />
  );
}

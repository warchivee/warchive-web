import { ColorCodes } from '@utils/color.util';
import { FontSizeType } from '@components/CommonComponents/text/index.type';

import AnglesUp from '@assets/icons/angles-up.svg?react';
import AnglesLeft from '@assets/icons/angles-left.svg?react';
import AnglesRight from '@assets/icons/angles-right.svg?react';
import Bars from '@assets/icons/bars.svg?react';
import Download from '@assets/icons/download.svg?react';
import Facebook from '@assets/icons/facebook.svg?react';
import HamburgerMenu from '@assets/icons/hamburger-menu.svg?react';
import Instagram from '@assets/icons/instagram.svg?react';
import Link from '@assets/icons/link.svg?react';
import Mail from '@assets/icons/mail.svg?react';
import Minus from '@assets/icons/minus.svg?react';
import Plus from '@assets/icons/plus.svg?react';
import Question from '@assets/icons/question.svg?react';
import Star from '@assets/icons/star.svg?react';
import Twitter from '@assets/icons/twitter.svg?react';
import Write from '@assets/icons/write.svg?react';
import Xmark from '@assets/icons/xmark.svg?react';
import Search from '@assets/icons/search.svg?react';
import ShareUp from '@assets/icons/share-up.svg?react';
import Up from '@assets/icons/up.svg?react';
import Down from '@assets/icons/down.svg?react';
import FloderPlus from '@assets/icons/folder-plus.svg?react';
import Share from '@assets/icons/share.svg?react';
import News from '@assets/icons/news.svg?react';

import { IconType, IconProps } from './index.type';

const IconSizeCodes: Record<FontSizeType, number> = {
  small: 10,
  normal: 12,
  big: 16,
  bigger: 20,
};

const icons: Record<IconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  'angles-up': AnglesUp,
  'angles-left': AnglesLeft,
  'angles-right': AnglesRight,
  bars: Bars,
  download: Download,
  facebook: Facebook,
  'hambuger-menu': HamburgerMenu,
  instagram: Instagram,
  link: Link,
  mail: Mail,
  minus: Minus,
  plus: Plus,
  question: Question,
  star: Star,
  twitter: Twitter,
  write: Write,
  xmark: Xmark,
  search: Search,
  'share-up': ShareUp,
  up: Up,
  down: Down,
  'folder-plus': FloderPlus,
  share: Share,
  news: News,
};

export default function Icon({ type, color, size }: IconProps) {
  const IconComponent = icons[type];

  return (
    <div className="icon" style={{ display: 'flex', justifyContent: 'center' }}>
      <IconComponent
        fill={ColorCodes[color]}
        height={IconSizeCodes[size]}
        width={IconSizeCodes[size]}
      />
    </div>
  );
}

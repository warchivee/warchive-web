import { Title, Caption, Content } from '@components/text';
import { ColorType } from '@utils/color';

export type FontSize = 'small' | 'normal' | 'big';
export const fontSize = {
  small: 12,
  normal: 16,
  big: 18,
};

export const renderLabel = (
  textType: FontSize,
  value: string,
  color: ColorType,
): React.ReactNode => {
  switch (textType) {
    case 'small':
      return <Caption value={value} color={color} />;
    case 'normal':
      return <Content value={value} color={color} />;
    case 'big':
      return <Title type="h4" value={value} color={color} />;
    default:
      return null;
  }
};

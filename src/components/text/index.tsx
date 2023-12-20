import classNames from 'classnames';
import { ColorType } from 'src/styles/utils/color';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4';

interface TitleProps {
  type: TitleType;
  value: string;
  color?: ColorType;
}

interface TextProps {
  value: string;
  color?: ColorType;
}

const generateClassName = (
  type: TitleType | 'content' | 'caption',
  color?: ColorType,
) =>
  classNames('text', { [`${type}`]: type }, { [`font-color-${color}`]: color });

export const Text = () => {};

export function Title({ type, value, color = 'black' }: TitleProps) {
  return <h1 className={generateClassName(type, color)}>{value}</h1>;
}
export function Content({ value, color = 'black' }: TextProps) {
  return (
    <article className={generateClassName('content', color)}>{value}</article>
  );
}
export function Caption({ value, color = 'black' }: TextProps) {
  return <q className={generateClassName('caption', color)}>{value}</q>;
}

Text.Title = Title;
Text.Content = Content;
Text.Caption = Caption;

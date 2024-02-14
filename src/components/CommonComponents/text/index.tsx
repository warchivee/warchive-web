import classNames from 'classnames';
import { TextProps, TitleProps } from './index.type';

export function Text({ children, color, size = 'normal' }: TextProps) {
  return (
    <div
      className={classNames(
        'text',
        { [`font-size-${size}`]: size },
        { [`font-color-${color}`]: color },
      )}
    >
      {children}
    </div>
  );
}

export function Title({ type, children, color = 'black' }: TitleProps) {
  return (
    <h1
      className={classNames(
        'text',
        { [`${type}`]: type },
        { [`font-color-${color}`]: color },
      )}
    >
      {children}
    </h1>
  );
}

Text.Title = Title;

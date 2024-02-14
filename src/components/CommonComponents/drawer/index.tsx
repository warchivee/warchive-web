import { ColorType } from '@utils/color.util';
import classNames from 'classnames';

export default function Drawer({
  children,
  isOpen,
  onClose,
  align = 'left',
  background = 'black',
  color = 'white',
  isBackgroundClickClose = true,
}: {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  align?: 'left' | 'right';
  background?: ColorType;
  color?: ColorType;
  isBackgroundClickClose?: boolean;
}) {
  return (
    <div className={classNames('drawer-overlay', { hidden: !isOpen })}>
      <div
        className={classNames(
          'drawer',
          { [`${align}`]: align },
          { [`background-${background}`]: background },
          { [`font-color-${color}`]: color },
        )}
      >
        {children}
      </div>
      {isBackgroundClickClose && (
        <div
          className="close-area"
          onClick={() => onClose()}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

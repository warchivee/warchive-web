import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from '@components/CommonComponents/modal';

interface MocalComponentProps {
  removeToDom: () => void;
}

interface ModalUtilParam {
  title?: string;
  message?: string;
  onConfirm?: (value?: string) => void;
}

const ModalUtil = {
  open: ({ title, message, onConfirm }: ModalUtilParam) => {
    function ModalComponent({ removeToDom }: MocalComponentProps) {
      const [open, setOpen] = useState<boolean>(true);

      const close = () => {
        setOpen(false);
        removeToDom();
      };

      const modal = (
        <Modal
          title={title}
          message={message}
          buttons={onConfirm ? ['cancel', 'confirm'] : ['confirm']}
          isOpen={open}
          onClose={close}
          onConfirm={() => {
            if (onConfirm) {
              onConfirm();
            }
            close();
          }}
        />
      );

      return modal;
    }

    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    const removeToDom = () => {
      document.body.removeChild(container);
    };

    root.render(<ModalComponent removeToDom={removeToDom} />);
  },
};

export default ModalUtil;

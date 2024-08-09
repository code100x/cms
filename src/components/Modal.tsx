import React, { forwardRef } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { children, onClose },
    ref,
  ) => {
    return (
      <dialog
        style={{
          overflow: 'scroll',
        }}
        ref={ref}
      >
        {children}
      </dialog>
    );
  },
);

export default Modal;

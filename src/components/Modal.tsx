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
      <dialog ref={ref} className='fixed inset-0 bg-transparent w-11/12 max-w-[700px]'>
        <div className='bg-[rgba(0,0,0,.3)] fixed inset-0'></div>
        <div className='z-50 relative bg-white dark:bg-gray-800 mx-auto rounded-[20px]'>
          {children}
        </div>
      </dialog>
    );
  },
);

export default Modal;

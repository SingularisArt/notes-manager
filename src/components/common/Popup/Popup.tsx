import React, { useEffect } from 'react';
import ReactModal from 'react-modal';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import Button from 'components/common/Button';

import './Popup.css';

ReactModal.setAppElement('#root');

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  content: JSX.Element;
  className?: string;
  centerButtons?: boolean;
};

const Popup: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onOk,
  content,
  className,
  centerButtons,
}) => {
  const modalButtonsClassName = centerButtons
    ? 'modal-buttons-center'
    : 'modal-buttons';

  const targetElement = document.querySelector('#root');

  useEffect(() => {
    if (targetElement) {
      if (isOpen) disableBodyScroll(targetElement);
      else enableBodyScroll(targetElement);
    }
  }, [isOpen, targetElement]);

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        className={`custom-modal ${className}`}
        overlayClassName="custom-modal-overlay"
        contentLabel="Custom Modal"
      >
        <div className="modal-content">{content}</div>
        <div className={modalButtonsClassName}>
          <Button text="Cancel" className="cancel-button" onClick={onClose} />
          <Button text="Ok" className="ok-button" onClick={onOk} />
        </div>
      </ReactModal>
    </div>
  );
};

export default Popup;

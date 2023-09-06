import React from 'react';
import Modal from 'react-modal';
import Button from 'components/common/Button';

import './Popup.css';

Modal.setAppElement('#root');

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  content: JSX.Element;
};

const Popup: React.FC<ModalProps> = ({ isOpen, onClose, onOk, content }) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
        contentLabel="Custom Modal"
      >
        <div className="modal-content">{content}</div>
        <div className="modal-buttons">
          <Button text="Cancel" className="cancel-button" onClick={onClose} />
          <Button text="Ok" className="ok-button" onClick={onOk} />
        </div>
      </Modal>
    </div>
  );
};

export default Popup;

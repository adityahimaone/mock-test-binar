import { Modal } from 'flowbite-react';

interface IModal {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function ModalMain({ isOpen, onClose, children }: IModal): JSX.Element {
  return (
    <Modal show={isOpen} onClose={onClose} size="lg" popup>
      <Modal.Header />
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalMain;

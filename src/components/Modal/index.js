import Proptypes from 'prop-types';

import { Overlay, Container, Footer } from "./styles";

import Button from '../Button';
import ReactPortal from '../ReactPortal';

export default function Modal({
  danger,
  visible,
  isLoading,
  title,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
}) {
  if (!visible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">
            {children}
          </div>
          <Footer>
            <button
              type="button"
              className="cancel-button"
              onClick={onCancel}
              disabled={isLoading}
            >
              {cancelLabel}
            </button>
            <Button
              type="button"
              isLoading={isLoading}
              danger={danger}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>
    </ReactPortal>
  );
}

Modal.propTypes = {
  danger: Proptypes.bool,
  visible: Proptypes.bool.isRequired,
  isLoading: Proptypes.bool,
  title: Proptypes.string.isRequired,
  children: Proptypes.node.isRequired,
  cancelLabel: Proptypes.string,
  confirmLabel: Proptypes.string,
  onCancel: Proptypes.func.isRequired,
  onConfirm: Proptypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};

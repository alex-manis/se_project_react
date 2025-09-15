import { Modal } from "../Modal/Modal";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, isLoading }) {
  return (
    <Modal name="confirm-delete" isOpen={isOpen} onClose={onClose}>
      <div className="modal__content modal__content_type_confirm">
        <p className="modal__title_confirm">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>
        <div className="modal__actions">
          <button
            className="modal__button modal__button_type_delete"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {" "}
            Yes, delete item
            {isLoading ? "Deleting…" : ""}
          </button>
          <button
            className="modal__button modal__button_type_cancel"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;

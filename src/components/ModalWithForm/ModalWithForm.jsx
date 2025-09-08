import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
  buttonText,
  isLoading,
  children,
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} className="modal__form" noValidate>
        {children}
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className={`modal__submit ${
            !isValid || isLoading ? "modal__submit-disabled" : ""
          }`}
        >
          {isLoading ? "Saving..." : buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;

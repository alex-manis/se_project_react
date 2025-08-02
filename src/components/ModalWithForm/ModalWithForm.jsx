import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close" />
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            type="submit"
            disabled={!isValid}
            className={`modal__submit ${
              !isValid ? "modal__submit-disabled" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

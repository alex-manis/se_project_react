import { useEffect } from "react";
import "./Modal.css";

export const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlay}
    >
      <div className="modal__content">
        {children}
        <button className="modal__close" type="button" onClick={onClose} />
      </div>
    </div>
  );
};

import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({ isOpen, onClose, onRegister, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: values.avatar,
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Register"
      buttonText={isLoading ? "Saving..." : "Sign Up"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.name}</span>
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar Url"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;

import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({ isOpen, onClose, onLogin, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Logging in..." : "Sign In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Email
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
        Password
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
    </ModalWithForm>
  );
}

export default LoginModal;

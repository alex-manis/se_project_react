import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({
  isOpen,
  onClose,
  onLogin,
  isLoading,
  onRegisterClick,
  loginError,
  setLoginError,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");
    onLogin({
      email: values.email,
      password: values.password,
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
    setLoginError("");
  }, [isOpen, resetForm, setLoginError]);

  const handleInputChange = (e) => {
    if (loginError) setLoginError("");
    handleChange(e);
  };

  return (
    <ModalWithForm
      title="Login"
      buttonText={isLoading ? "Logging in..." : "Sign In"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
      extraButton={{ text: "or Sign up", onClick: onRegisterClick }}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleInputChange}
          required
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          minLength={2}
          className="modal__input"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleInputChange}
          required
        />
        <span className="modal__error">{errors.password}</span>
      </label>
      {loginError && <p className="modal__login-error">{loginError}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;

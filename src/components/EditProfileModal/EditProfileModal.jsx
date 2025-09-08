import "./EditProfileModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useContext } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
    if (!isOpen) resetForm();
  }, [isOpen, currentUser, resetForm, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({ name: values.name, avatar: values.avatar });
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText={isLoading ? "Saving..." : "Save"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          name="name"
          type="text"
          value={values.name || ""}
          onChange={handleChange}
          className="modal__input"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="avatar" className="modal__label">
        Avatar URL
        <input
          id="avatar"
          name="avatar"
          type="url"
          value={values.avatar || ""}
          onChange={handleChange}
          className="modal__input"
          required
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;

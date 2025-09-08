import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({ onClose, isOpen, onAddItemModalSubmit, isLoading }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    });
  };

  useEffect(() => {
    if (!isOpen) resetForm();
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText={isLoading ? "Saving..." : "Add garment"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid && !isLoading}
      isLoading={isLoading}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          name="name"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.imageUrl}</span>
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id={type}
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              required
            />
            {type[0].toUpperCase() + type.slice(1)}
          </label>
        ))}
        <span className="modal__error">{errors.weather}</span>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

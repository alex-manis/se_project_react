import { Modal } from "../Modal/Modal";
import deleteItemImage from "../../assets/deleteItemImage.svg";
import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  return (
    <Modal name="preview" isOpen={isOpen} onClose={onClose}>
      <div className="modal__content modal__content_type_image">
        {isOwn && (
          <button
            className="item-modal__delete-button"
            onClick={() => onDelete(card)}
          >
            <img src={deleteItemImage} alt="Delete Item" />
          </button>
        )}
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </Modal>
  );
}

export default ItemModal;

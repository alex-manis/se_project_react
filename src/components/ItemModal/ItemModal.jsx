import { Modal } from "../Modal/Modal";
import "./ItemModal.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function ItemModal({ isOpen, onClose, card, onDelete, isDeleting }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const openConfirm = () => setIsConfirmOpen(true);
  const closeConfirm = () => setIsConfirmOpen(false);

  const handleConfirmDelete = () => {
    onDelete(card);
    closeConfirm();
    onClose();
  };
  return (
    <>
      <Modal name="preview" isOpen={isOpen} onClose={onClose} type="image">
        <div className="modal__content_type_image">
          <img src={card.imageUrl} alt={card.name} className="modal__image" />

          <div className="modal__bottom-row">
            <div className="modal__footer">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>

            {isOwn && (
              <button
                className="item-modal__delete-button"
                onClick={openConfirm}
              >
                Delete Item
              </button>
            )}
          </div>
        </div>
      </Modal>

      <ConfirmDeleteModal
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
}

export default ItemModal;

import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = currentUser
    ? clothingItems.filter((item) => item.owner === currentUser._id)
    : [];
  return (
    <div className="clothes-section">
      <div className="clothes-section__bar">
        <p className="clothes-section__description">Your items</p>

        {currentUser && (
          <button
            onClick={handleAddClick}
            type="button"
            className="clothes-section__add-new-btn"
          >
            + Add new
          </button>
        )}
      </div>
      <ul className="clothes-section__items">
        {userItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

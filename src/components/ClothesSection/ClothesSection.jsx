import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import addnew from "../../assets/addnew.svg";

function ClothesSection({ onCardClick, clothingItems, handleAddClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__bar">
        <p className="clothes-section__description">Your items</p>

        <button
          onClick={handleAddClick}
          type="button"
          className="clothes-section__add-new-btn"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;

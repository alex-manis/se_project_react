import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>

      <button
        className="profile__signout-btn"
        onClick={onSignOut}
        type="button"
      >
        Sign out
      </button>
      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
      <section className="profile__clothing-items">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
        />
      </section>
    </div>
  );
}

export default Profile;

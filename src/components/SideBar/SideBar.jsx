import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <section className="sidebar__profile-info">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </section>
      <button
        type="button"
        className="profile__edit-btn"
        onClick={onEditProfile}
      >
        Change profile data
      </button>
      <button
        className="profile__signout-btn"
        onClick={onSignOut}
        type="button"
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;

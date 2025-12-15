import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import Loader from "../Loader/Loader";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const isLoading = !weatherData;

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>

      <p className="header__date-and-location">
        {isLoading ? <Loader /> : currentDate},{" "}
        {isLoading ? <Loader /> : weatherData.city}
      </p>
      <ToggleSwitch />

      {currentUser && currentUser.name ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser.name?.[0].toUpperCase() || ""}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button onClick={onRegisterClick} className="header__auth-btn">
            Sign up
          </button>
          <button onClick={onLoginClick} className="header__auth-btn">
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

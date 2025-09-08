import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { register, login, checkToken, getToken } from "../../utils/auth";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "../../vendor/fonts.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const openEditProfileModal = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => setActiveModal("add-garment");

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    setIsLoading(true);
    addItem({ name, imageUrl, weather }, getToken())
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoading(true);
    register({ name, avatar, email, password })
      .then(() => {
        return login({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    login({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);
    updateUser({ name, avatar }, localStorage.getItem("jwt"))
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleDeleteItem = (card) => {
    const token = getToken();
    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ _id, likes }) => {
    const token = localStorage.getItem("jwt");

    const isLiked = likes.some((id) => id === currentUser._id);

    const likeAction = !isLiked ? addCardLike : removeCardLike;

    likeAction(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then(({ data }) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page_content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={openRegisterModal}
              onLoginClick={openLoginModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={openEditProfileModal}
                      onCardLike={handleCardLike}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

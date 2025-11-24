import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { register, login, checkToken } from "../../utils/auth";
import { saveToken, getToken, removeToken } from "../../utils/token";
import CurrentUserContext from "../../utils/contexts/CurrentUserContext";
import ThemeContext from "../../utils/contexts/ThemeContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { APIkey } from "../../utils/constants";
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
import Intro from "../Intro/Intro";
import "../../vendor/fonts.css";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("C");
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const openRegisterModal = () => setActiveModal("register");
  const openLoginModal = () => setActiveModal("login");
  const openEditProfileModal = () => setActiveModal("edit-profile");
  const closeActiveModal = () => setActiveModal("");
  const handleAddClick = () => setActiveModal("add-garment");

  function handleSubmit(request) {
    setIsLoading(true);
    return request()
      .then((res) => {
        setActiveModal("");
        return res;
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => setIsLoading(false));
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) =>
    handleSubmit(() =>
      addItem({ name, imageUrl, weather }, getToken()).then((res) =>
        setClothingItems((prev) => [res.data, ...prev])
      )
    );

  const handleRegister = ({ name, avatar, email, password }) =>
    handleSubmit(() =>
      register({ name, avatar, email, password })
        .then(() => login({ email, password }))
        .then((res) => {
          saveToken(res.token);
          setIsLoggedIn(true);
          return checkToken(res.token);
        })
        .then((res) => {
          setCurrentUser(res.data);
          loadUserItems(res.data._id);
        })
    );

  const handleLogin = ({ email, password }) => {
    setLoginError("");
    handleSubmit(() =>
      login({ email, password })
        .then((res) => {
          if (!res.token) throw new Error("No token in response");
          saveToken(res.token);
          return checkToken(res.token);
        })
        .then((res) => {
          setCurrentUser(res.data);
          loadUserItems(res.data._id);
          setIsLoggedIn(true);
        })
    ).catch((err) => setLoginError("Email or password incorrect"));
  };

  const handleSignOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setClothingItems([]);
    navigate("/");
  };

  const handleUpdateUser = (data) =>
    handleSubmit(() =>
      updateUser(data, getToken()).then((res) => {
        setCurrentUser(res.data);
        loadUserItems(res.data._id);
      })
    );

  const handleDeleteItem = (card) =>
    handleSubmit(() =>
      deleteItem(card._id, getToken()).then(() =>
        setClothingItems((prev) => prev.filter((item) => item._id !== card._id))
      )
    );

  const handleCardLike = ({ _id, likes }) => {
    const token = getToken();
    const isLiked = likes.some((id) => id === currentUser._id);
    const likeAction = !isLiked ? addCardLike : removeCardLike;
    likeAction(_id, token)
      .then((res) => {
        const updatedCard = res.data;
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const loadUserItems = (userId) => {
    getItems()
      .then(({ data }) => {
        const userItems = data.filter((item) => item.owner === userId);
        setClothingItems(userItems.reverse());
      })
      .catch(console.error);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      },
      (error) => {
        console.error("Geolocation error:", error);

        setCoords({
          latitude: 32.794044,
          longitude: 34.989571,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (!coords) return;
    getWeather(coords, APIkey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch(console.error);
  }, [coords]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
          loadUserItems(res.data._id);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          setIsLoggedIn(false);
          setCurrentUser(null);
          setClothingItems([]);
        });
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page_content">
              {weatherData && <Intro weatherData={weatherData} />}

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
                      setClothingItems={setClothingItems}
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
              onLoginClick={openLoginModal}
            />

            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onLogin={handleLogin}
              isLoading={isLoading}
              onRegisterClick={openRegisterModal}
              loginError={loginError}
              setLoginError={setLoginError}
            />

            <ItemModal
              isOpen={activeModal === "preview"}
              card={selectedCard}
              onClose={closeActiveModal}
              onDelete={handleDeleteItem}
              isDeleting={isLoading}
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
    </ThemeContext.Provider>
  );
}

export default App;

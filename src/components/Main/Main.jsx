import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext, useEffect } from "react";
import CurrentTemperatureUnitContext from "../../utils/contexts/CurrentTemperatureUnitContext";
import { getItems } from "../../utils/api";
import Loader from "../../components/Loader/Loader";

function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
  setClothingItems,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  useEffect(() => {
    getItems()
      .then(({ data }) => setClothingItems(data.reverse()))
      .catch(console.error);
  }, [setClothingItems]);

  const isLoading = !weatherData;

  return (
    <main>
      {isLoading ? <Loader /> : <WeatherCard weatherData={weatherData} />}

      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {isLoading ? (
            <Loader />
          ) : (
            `${weatherData.temp[currentTemperatureUnit]}° ${currentTemperatureUnit}`
          )}
          {" / "}You may want to wear:
        </p>

        <ul className="cards__list">
          {!isLoading &&
            clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;

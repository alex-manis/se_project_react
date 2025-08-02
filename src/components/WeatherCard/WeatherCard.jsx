import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filtredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;

  if (filtredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filtredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={` Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

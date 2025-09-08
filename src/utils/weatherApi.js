const checkResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
const request = (url, options) => fetch(url, options).then(checkResponse);

export const getWeather = ({ latitude, longitude }, APIkey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return request(url);
};

export const filterWeatherData = (data) => {
  return {
    city: data.name,
    temp: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
    type: getWeatherType(data.main.temp),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };
};

const isDay = ({ sunrise, sunset }, now) =>
  sunrise * 1000 < now && now < sunset * 1000;

const getWeatherType = (tempF) => {
  if (tempF >= 80) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
};

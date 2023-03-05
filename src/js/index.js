import {
  formData,
  getCityName,
  getCityCoords,
  getWeatherDataByCoords,
} from "./apiFunction.js";

import {
  renderWeatherInfo,
  displayDailyForecast,
  displayHourlyForecast,
  changeHoursPage,
} from "./apiDOM.js";

const searchBtn = document.querySelector(".search-btn");
const input = document.querySelector(".search-input");

const dailyBtn = document.querySelector(".daily-btn");
const hourlyBtn = document.querySelector(".hourly-btn");

const changeHoursLeft = document.querySelector(".change-hours__left");
const changeHoursRight = document.querySelector(".change-hours__right");

const dots = document.querySelectorAll(".dot");

let hoursPage = 1;

function getPosition() {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      });
    }
  });
}

const getWeatherData = async (initialLoad = false) => {
  try {
    let cityName;
    let latitude;
    let longitude;

    if (initialLoad) {
      const { coords } = await getPosition();
      latitude = coords.latitude;
      longitude = coords.longitude;
      const cityCoords = await fetch(getCityName(latitude, longitude));

      const cityData = await cityCoords.json();
      cityName = cityData[0].name;
    } else {
      cityName = formData();
      const cityCoords = await fetch(getCityCoords(cityName));
      const cityLatlon = await cityCoords.json();
      latitude = cityLatlon[0].lat;
      longitude = cityLatlon[0].lon;
    }
    if (!cityName) {
      return;
    }

    const weatherData = await fetch(
      getWeatherDataByCoords(latitude, longitude)
    );
    const data = await weatherData.json();
    input.value = "";

    renderWeatherInfo(data, cityName);
  } catch (err) {}
};

getWeatherData(true);

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getWeatherData();
});

dailyBtn.addEventListener("click", displayDailyForecast);
hourlyBtn.addEventListener("click", displayHourlyForecast);

changeHoursLeft.addEventListener("click", () => {
  if (hoursPage > 1) {
    hoursPage--;
    changeHoursPage(hoursPage);
  }
});

changeHoursRight.addEventListener("click", () => {
  if (hoursPage < 3) {
    hoursPage++;
    changeHoursPage(hoursPage);
  }
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    // hoursPage =
    hoursPage = parseInt(e.target.dataset.dot, 10);
    changeHoursPage(hoursPage);
  });
});

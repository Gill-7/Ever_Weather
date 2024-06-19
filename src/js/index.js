import {
  formData,
  getCityName,
  getCityCoords,
  getWeatherDataByCoords,
} from "./apiFunction.js";

import "../styles/index.css";

import {
  renderWeatherInfo,
  displayDailyForecast,
  displayHourlyForecast,
} from "./apiDOM.js";

//   // var image = document.images[0];
//   // var downImg = new Image();
//   // downImg.onload = function () {
//   //   image.src = this.src;
//   // };

//   // downImg.src = "../svg/weather.jpg";

//const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector(".form");
const input = document.querySelector(".search-input");

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
    document.querySelector(".error-msg").style.visibility = "hidden";
    renderWeatherInfo(data, cityName);
    //       document.querySelector("body").style.visibility = "visible";

    //       document.querySelector("#loader").style.visibility = "hidden";
    // document.querySelector(".form").style.display = "block";
  } catch (err) {
    document.querySelector(".error-msg").style.visibility = "visible";
  }
  input.value = "";
};

getWeatherData(true);

// searchBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   getWeatherData();
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherData();
});

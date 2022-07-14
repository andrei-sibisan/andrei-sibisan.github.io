"use strict";

//^-------------------------------------------------------------------------
//^--------------- clock portion -------------------------------------------
//^-------------------------------------------------------------------------

let hour = document.querySelector(".hour-hand");
let minute = document.querySelector(".minute-hand");
let second = document.querySelector(".second-hand");

function clock() {
  let d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  //   console.log(hr);
  let hr_rotation = (hr / 12) * 360 + (min / 60) * 30 + 90;
  let min_rotation = (min / 60) * 360 + (sec / 60) * 6 + 90;
  let sec_rotation = (sec / 60) * 360 + 90;
  //   console.log(hr_rotation);
  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
}

setInterval(clock, 1000);

//^-------------------------------------------------------------------------
//^--------------- geolocation portion -------------------------------------
//^-------------------------------------------------------------------------
let latitude = 44.439663;
let longitude = 26.096306;

if (`geolocation` in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log("Latitude is " + latitude + "\n" + "Longitude is " + longitude);
  });
} else {
  alert(`Geolocation is not available`);
}
//^-------------------------------------------------------------------------
//^--------------- weather portion -----------------------------------------
//^-------------------------------------------------------------------------

//* ---------------------- weather variables --------------------

let currentTemp = document.querySelector(`.current-temp`);
let maxTemp = document.querySelector(`.max-temp`);
let minTemp = document.querySelector(`.min-temp`);

let weatherContainer = document.querySelector(`.weather-container`);
//* -------------------------------------------------

//* --------------- dom manipulation function -------------------

function dataLogger(obj) {
  console.log(obj.main);
  console.log(obj.name);
  console.log(`The temperature is`, obj.main.temp);
  console.log(`It feels like`, obj.main.feels_like);
  console.log(`The minimum of the day is`, obj.main.temp_min);
  console.log(`The maximum of the day is`, obj.main.temp_max);
}
const celsius = "&#8451";
function weatherDisplay(obj) {
  dataLogger(obj);
  // currentTemp.innerHTML =
  //   "Our current temperature is " + obj.main.temp + " &#8451";
  // maxTemp.innerHTML = "The day's maximum is " + obj.main.temp_max + " &#8451";
  // minTemp.innerHTML = "The day's minimum is " + obj.main.temp_min + " &#8451";
  //? main temperature
  let mainTemp = document.querySelector(`.main-temp`);
  mainTemp.innerHTML = Math.round(obj.main.temp) + celsius;

  //? feels like
  let feelsLike = document.querySelector(".feels-like");
  feelsLike.innerHTML = `feels like ${Math.round(
    obj.main.feels_like
  )}${celsius}`;

  //? min-max temperature div
  let minMaxTemp = document.querySelector(`.min-max-container`);

  //? min and max temperature div
  let minTemp = document.querySelector(`.min`);
  let maxTemp = document.querySelector(`.max`);

  minTemp.innerHTML = "🔻" + Math.round(obj.main.temp_min) + celsius;
  maxTemp.innerHTML = "🔺" + Math.round(obj.main.temp_max) + celsius;
}

let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=806818a233829c2e1d3c2dd7b39346a3`;

function getWeather(url) {
  fetch(url)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error encountered");
      }
    })
    .then(function (obj) {
      weatherDisplay(obj);
    })
    .catch(function (error) {
      alert(error);
    });
}
setTimeout(getWeather, 6000, url);

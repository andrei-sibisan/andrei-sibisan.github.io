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

let units = `metric`;
let url = ``;
const apiKey = `806818a233829c2e1d3c2dd7b39346a3`;
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
  // dataLogger(obj);
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
  let location = document.querySelector(`.location`);
  location.innerHTML = obj.name;
  //? min and max temperature div
  let minTemp = document.querySelector(`.min`);
  let maxTemp = document.querySelector(`.max`);

  minTemp.innerHTML = "🔻" + Math.round(obj.main.temp_min) + celsius;
  maxTemp.innerHTML = "🔺" + Math.round(obj.main.temp_max) + celsius;
}

function getWeather(url) {
  fetch(url)
    .then(function (response) {
      // console.log(`new latitude: ${latitude} and new longitude: ${longitude}`);
      // console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error encountered");
      }
    })
    .then(function (obj) {
      console.log(obj);
      weatherDisplay(obj);
    })
    .catch(function (error) {
      alert(error);
    });
}

function makeURL(lat, lon, units) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
}

function initGeo() {
  if (`geolocation` in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      console.log(
        "Latitude is " + latitude + "\n" + "Longitude is " + longitude
      );
      let url = makeURL(latitude, longitude, units);
      getWeather(url);
      let coords = [latitude, longitude];
      return coords;
    });
  } else {
    alert(`Geolocation is not available`);
  }
}

function updateTemp(lat, lon, units) {
  makeURL(lat, lon, units);
  getWeather(url);
  console.log(`update called`);
}

// console.log(latitude, longitude);
initGeo();
const geoInterval = setInterval(initGeo, 60000);
let searchInterval;
function makeSearchURL(src) {
  return `http://api.openweathermap.org/geo/1.0/direct?q=${src}&limit=1&appid=${apiKey}`;
  // console.log(`${url}`);
}

function getSearchWeather(url) {
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
      console.log(obj);
      if (!obj.length) {
        alert(`City not found`);
        return;
      }
      let latitude = obj[0].lat;
      let longitude = obj[0].lon;
      console.log(latitude, longitude);
      let url = makeURL(latitude, longitude, units);
      console.log(url);
      clearInterval(geoInterval);
      getWeather(url);
      if (searchInterval) {
        clearInterval(searchInterval);
        searchInterval = setInterval(getWeather, 60000, url);
        console.log(`i'm in search interval`);
      } else {
        searchInterval = setInterval(getWeather, 60000, url);
      }
    })
    .catch(function (error) {
      alert(error);
    });
}

function searchEnter(ele) {
  if (event.key === `Enter`) {
    console.log(ele.value);
    if (ele.value === "") return;
    let city = ele.value;
    ele.value = ``;

    let url = makeSearchURL(city);
    console.log(url);
    getSearchWeather(url);
  }
}
function search(ele) {
  let city = ele.textContent;
  console.log(city);
  document.querySelector(".input").value = "";
  document.getElementById("result").innerHTML = "";
  let url = makeSearchURL(city);
  console.log(url);
  getSearchWeather(url);
}
let search_terms = [
  `Brasov`,
  `Constanta`,
  `Targoviste`,
  `Campulung`,
  `Slobozia`,
  `Busteni`,
  `Braila`,
];

function autoCompleteMatch(input) {
  if (input == ``) {
    return [];
  }
  let reg = new RegExp(input);
  return search_terms.filter(function (term) {
    if (term.toLowerCase().match(reg)) {
      return term;
    }
  });
}

function showResults(val) {
  let res = document.getElementById("result");
  res.innerHTML = "";
  let list = "";
  let terms = autoCompleteMatch(val.toLowerCase());
  for (let i = 0; i < terms.length; i++) {
    list += '<li onclick="search(this)">' + terms[i] + "</li>";
  }
  res.innerHTML = "<ul>" + list + "</ul>";
}

"use strict";
var timerId;
let searchStr = "";
//^-------------------------------------------------------------------------
//^--------------- clock portion -------------------------------------------
//^-------------------------------------------------------------------------

let hour = document.querySelector(".hour-hand");
let minute = document.querySelector(".minute-hand");
let second = document.querySelector(".second-hand");

let hr;
let min;
let sec;
function clock(offsetTZ) {
  let d = new Date();
  // console.log(Date.now());
  let offsetUTC = d.getTimezoneOffset();
  // console.log(offsetUTC * 60 * 1000);
  d.setMinutes(d.getMinutes() + offsetUTC);
  d.setSeconds(d.getSeconds() + offsetTZ);
  hr = d.getHours();
  min = d.getMinutes();
  sec = d.getSeconds();
  //^   rotation of the hands
  let hr_rotation = (hr / 12) * 360 + (min / 60) * 30 + 90;
  let min_rotation = (min / 60) * 360 + (sec / 60) * 6 + 90;
  let sec_rotation = (sec / 60) * 360 + 90;
  //   console.log(hr_rotation);
  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
}
let timezone = setInterval(clock, 1000, 0);
// let clockInterval = setInterval(clock, 1000, 0);
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

//* --------- weather and time matrix ---------------
const weatherMap = new Map();
const nightMap = new Map();
const morningMap = new Map();
const dayMap = new Map();
const duskMap = new Map();

nightMap.set(
  `Clear`,
  `https://media.giphy.com/media/Qx4ltILRcYzHK50B9R/giphy.gif`
);
nightMap.set(
  `Drizzle`,
  `https://media.giphy.com/media/PbOaO2fedzQLm/giphy.gif`
);
nightMap.set(
  `Clouds`,
  `https://media.giphy.com/media/3o6Zt93byJYeHqvrwc/giphy.gif`
);
nightMap.set(
  `Rain`,
  `https://media.giphy.com/media/3ov9jVajUykLpFTMQM/giphy.gif`
);
nightMap.set(
  `Thunderstorm`,
  `https://media.giphy.com/media/XYxfj2ix1cZwY/giphy.gif`
);
nightMap.set(`Snow`, `https://media.giphy.com/media/bGaOdqeqYQKc0/giphy.gif`);
nightMap.set(`Mist`, `https://media.giphy.com/media/dz6Nrk35xWP3q/giphy.gif`);
nightMap.set(
  `Smoke`,
  `https://media.giphy.com/media/3o7qE7qTCaFrqPAkzC/giphy.gif`
);
nightMap.set(
  `Haze`,
  `https://media.giphy.com/media/wEM71wbHnFPTHa7FSt/giphy.gif`
);
nightMap.set(
  `Dust`,
  `https://media.giphy.com/media/WqgM24U3XnnobDPhUx/giphy.gif`
);
nightMap.set(`Ash`, `https://media.giphy.com/media/B0FDRYtE2GSS4/giphy.gif`);
nightMap.set(
  `Tornado`,
  `https://media.giphy.com/media/5QXkoDtmD8NGi7MuFP/giphy.gif`
);

morningMap.set(
  `Clear`,
  `https://media.giphy.com/media/jMf1y3bfDMPFA9eFrJ/giphy.gif`
);
morningMap.set(
  `Drizzle`,
  `https://media.giphy.com/media/t7Qb8655Z1VfBGr5XB/giphy.gif`
);
morningMap.set(
  `Clouds`,
  `https://media.giphy.com/media/d3PcEfjRsLUqgTGZSE/giphy.gif`
);
morningMap.set(
  `Rain`,
  `https://media.giphy.com/media/UsMAPgAP1wjW7Coxw2/giphy.gif`
);
morningMap.set(
  `Thunderstorm`,
  `https://media.giphy.com/media/l0HlLP5fowu9vAbUk/giphy.gif`
);
morningMap.set(`Snow`, `https://media.giphy.com/media/PkaZUCdVm2c5G/giphy.gif`);
morningMap.set(
  `Mist`,
  `https://media.giphy.com/media/xT0xeK2kHV7n4qVGEg/giphy.gif`
);
morningMap.set(
  `Smoke`,
  `https://media.giphy.com/media/XG3vrDXZYW9yg/giphy.gif`
);
morningMap.set(
  `Haze`,
  `https://media.giphy.com/media/d6JfdOpurCisGQdzdA/giphy.gif`
);
morningMap.set(
  `Dust`,
  `https://media.giphy.com/media/RoCAThaQXCh9VELk7f/giphy.gif`
);
morningMap.set(
  `Ash`,
  `https://media.giphy.com/media/JwjLYmdPowBlVMCoZk/giphy.gif`
);
morningMap.set(
  `Tornado`,
  `https://media.giphy.com/media/rWN1SFLm3g1rQYLHUA/giphy.gif`
);

dayMap.set(
  `Clear`,
  `https://media.giphy.com/media/1Fm7jEapE18HwS6fkT/giphy.gif`
);
dayMap.set(
  `Drizzle`,
  `https://media.giphy.com/media/3o7at59KDANvJrUDbG/giphy.gif`
);
dayMap.set(`Clouds`, `https://media.giphy.com/media/mno6BJfy8USic/giphy.gif`);
dayMap.set(
  `Rain`,
  `https://media.giphy.com/media/3o6wNIK2unphUcCcqQ/giphy.gif`
);
dayMap.set(
  `Thunderstorm`,
  `https://media.giphy.com/media/3osxYzIQRqN4DOEddC/giphy.gif`
);
dayMap.set(`Snow`, `https://media.giphy.com/media/qyCDVJBPdBET6/giphy.gif`);
dayMap.set(`Mist`, `https://media.giphy.com/media/11uphU5Zfgk1vW/giphy.gif`);
dayMap.set(`Smoke`, `https://media.giphy.com/media/iXvC4dJHXuNxu/giphy.gif`);
dayMap.set(
  `Haze`,
  `https://media.giphy.com/media/q7Zs2i4boEtq1vPFEE/giphy.gif`
);
dayMap.set(
  `Dust`,
  `https://media.giphy.com/media/aDeYILgT8f3REd49Sw/giphy.gif`
);
dayMap.set(`Ash`, `https://media.giphy.com/media/r5gHt2TCIiHK0/giphy.gif`);
dayMap.set(`Tornado`, `https://media.giphy.com/media/ed8JGxnQmrke4/giphy.gif`);

duskMap.set(
  `Clear`,
  `https://media.giphy.com/media/ZZIEtQHmiTNwuxTOdt/giphy.gif`
);
duskMap.set(
  `Drizzle`,
  `https://media.giphy.com/media/lQU1BYYxavCPkPiWiT/giphy.gif`
);
duskMap.set(`Clouds`, `https://media.giphy.com/media/1uLQUtPLbJMQ0/giphy.gif`);
duskMap.set(`Rain`, `https://media.giphy.com/media/B2czf5h7JtjNe/giphy.gif`);
duskMap.set(
  `Thunderstorm`,
  `https://media.giphy.com/media/8cdBgACkApvt6/giphy.gif`
);
duskMap.set(`Snow`, `https://media.giphy.com/media/bnsWLCG5bEaiI/giphy.gif`);
duskMap.set(
  `Mist`,
  `https://media.giphy.com/media/l0Exhl2a4hQlubRfy/giphy.gif`
);
duskMap.set(
  `Smoke`,
  `https://media.giphy.com/media/xTiTnlanlqxnyENcZi/giphy.gif`
);
duskMap.set(
  `Haze`,
  `https://media.giphy.com/media/xT9KVgHIvt5YJXT7W0/giphy.gif`
);
duskMap.set(
  `Dust`,
  `https://media.giphy.com/media/hFp4sVaHVpipwwMyVa/giphy.gif`
);
duskMap.set(
  `Ash`,
  `https://media.giphy.com/media/TgXByBtK46u6C6fpco/giphy.gif`
);
duskMap.set(
  `Tornado`,
  `https://media.giphy.com/media/2TMrbPmlnmyIfZF8KY/giphy.gif`
);

weatherMap.set(`night`, nightMap);
weatherMap.set(`morning`, morningMap);
weatherMap.set(`day`, dayMap);
weatherMap.set(`dusk`, duskMap);

console.log(weatherMap.get(`morning`).get(`Rain`));
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

function gifSetter(obj) {
  let overcontainer = document.querySelector(".overcontainer");
  const timesOfDay = ["night", "morning", "day", "dusk"];
  let timeOfDay = timesOfDay[0];

  let sunriseDateObj = new Date(obj.sys.sunrise * 1000);
  let sunrise = 0;
  sunriseDateObj.getMinutes() < 30
    ? (sunrise = sunriseDateObj.getHours())
    : (sunrise = sunriseDateObj.getHours() + 1);
  let sunsetDateObj = new Date(obj.sys.sunset * 1000);
  let sunset = 0;
  sunsetDateObj.getMinutes() < 30
    ? (sunset = sunsetDateObj.getHours())
    : (sunset = sunsetDateObj.getHours() + 1);
  console.log(sunriseDateObj, sunsetDateObj);
  console.log(
    `Sunrise will be: ${sunrise}:00 hours and sunset will be at ${sunset}:00 hours`
  );
  console.log(timeOfDay);

  if (hr < sunrise - 1 || hr >= sunset + 1) {
    timeOfDay = timesOfDay[0];
  } else if (hr >= sunrise - 1 && hr < sunrise + 1) {
    timeOfDay = timesOfDay[1];
  } else if (hr >= sunrise + 1 && hr < sunset - 1) {
    timeOfDay = timesOfDay[2];
  } else if (hr >= sunset - 1 && hr < sunset + 1) {
    timeOfDay = timesOfDay[3];
  }
  console.log(timeOfDay);
  // let background = weatherMap.get(timeOfDay).get(obj.weather[0].main);
  let background = weatherMap.get(timeOfDay).get(`Rain`);

  overcontainer.style.backgroundImage = `url(${background})`;
  overcontainer.style.backgroundPosition = "center";
}

function weatherDisplay(obj) {
  // dataLogger(obj);
  // currentTemp.innerHTML =
  //   "Our current temperature is " + obj.main.temp + " &#8451";
  // maxTemp.innerHTML = "The day's maximum is " + obj.main.temp_max + " &#8451";
  // minTemp.innerHTML = "The day's minimum is " + obj.main.temp_min + " &#8451";
  //? main temperature
  let mainTemp = document.querySelector(`.main-temp`);

  mainTemp.innerHTML =
    Math.round(obj.main.temp) +
    celsius +
    `<p style="font-size: 0.512rem; font-style: italic; justify-item: center">     feels like ${Math.round(
      obj.main.feels_like
    )}${celsius}</p>`;

  //? weather description
  let weatherDescr = document.querySelector(".weather-description");
  weatherDescr.innerHTML = obj.weather[0].description;
  //? feels like
  // let feelsLike = document.querySelector(".feels-like");
  // feelsLike.innerHTML = `feels like ${Math.round(
  //   obj.main.feels_like
  // )}${celsius}`;

  //? location div
  let icon = obj.weather[0].icon;
  let location = document.querySelector(`.location`);
  location.innerHTML = obj.name;
  let iconHTML = document.querySelector(".weather-icon");
  iconHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"> `;
  //? min and max temperature div
  let minTemp = document.querySelector(`.min`);
  let maxTemp = document.querySelector(`.max`);

  minTemp.innerHTML = "🔻" + Math.round(obj.main.temp_min) + celsius;
  maxTemp.innerHTML = "🔺" + Math.round(obj.main.temp_max) + celsius;
  clearInterval(timezone);

  timezone = setInterval(clock, 1000, obj.timezone);
  gifSetter(obj);
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
      searchStr = "";
      clearInterval(geoInterval);
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
  return `https://api.openweathermap.org/geo/1.0/direct?q=${src}&limit=10&appid=${apiKey}`;
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
      console.log(obj);
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
function search(lat, lon) {
  document.querySelector(".input").value = "";
  document.getElementById("result").innerHTML = "";
  // document.getElementById("result").style = "display: none";

  let url = makeURL(lat, lon, units);
  console.log(url);
  getWeather(url);
}

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

let input = document.querySelector(`.input`);

input.addEventListener("input", function () {
  showResults(input.value);
  // throttleFunction(showResults, 200, input.value);
});

function showResults(val) {
  let res = document.getElementById("result");
  res.innerHTML = "";
  // res.style = "display: block";
  if (val == ``) return;

  let aURL = makeSearchURL(val);
  fetch(aURL)
    .then(function (response) {
      res.innerHTML = "";
      return response.json();
    })
    .then(function (obj) {
      const newUL = document.createElement("ul");
      res.appendChild(newUL);
      obj.forEach((element) => {
        const newLi = document.createElement("li");
        const newContent = document.createTextNode(
          element.name + ", " + element.country
        );
        newLi.appendChild(newContent);
        newLi.addEventListener("click", function () {
          search(element.lat, element.lon);
        });
        newUL.appendChild(newLi);
      });
      // res.innerHTML = "<ul>" + list + "</ul>";
      return true;
    })
    .catch(function (error) {
      console.warn(`Something went wrong`, error);
      return false;
    });

  // let terms = autoCompleteMatch(val.toLowerCase());
  // for (let i = 0; i < terms.length; i++) {
  //   list += '<li onclick="search(this)">' + terms[i] + "</li>";
  // }
}

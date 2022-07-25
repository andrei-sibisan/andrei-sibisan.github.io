import { updateMod } from "./update.js";

export let res = document.getElementById("result");
res.classList.add("hidden");

export function showResults(arr, mObj) {
  res.classList.remove("hidden");
  let newUL = document.createElement("ul");
  res.appendChild(newUL);
  arr.forEach((element) => {
    let newLi = document.createElement("li");
    let newContent = document.createTextNode(
      element.name + ", " + element.country
    );
    newLi.appendChild(newContent);
    newLi.addEventListener("click", function () {
      const max_interval = window.setInterval(function () {},
      Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < max_interval; i++) {
        window.clearInterval(i);
      }
      let clockTimer = setInterval(updateClock, 1000, mObj);
      console.log(element.lat, element.lon);
      mObj.setLat(element.lat);
      mObj.setLon(element.lon);
      console.log(mObj.lat, mObj.lon);
      mObj.makeURL();
      console.log(mObj.url);
      updateMod(mObj.url, mObj);
      displayData(mObj);

      let timerId = setInterval(updateMod, 60000, mObj.url, mObj);
      mObj.inputField.value = "";
      res.classList.add("hidden");
    });
    newUL.appendChild(newLi);
  });
}
export function displayData(mObj) {
  let celsius = "&#8451";
  let currentTemp = document.querySelector(`.main-temp`);

  let weatherContainer = document.querySelector(`.weather-container`);

  currentTemp.innerHTML =
    Math.round(mObj.mainTemp) +
    celsius +
    `<p style="font-size: 0.512rem; font-style: italic; justify-item: center">     feels like ${Math.round(
      mObj.feelsLike
    )}${celsius}</p>`;

  let weatherDescr = document.querySelector(".weather-description");
  weatherDescr.innerHTML = mObj.weatherDescr;
  let icon = mObj.weatherIcon;
  let location = document.querySelector(`.location`);
  location.innerHTML = mObj.name;
  let iconHTML = document.querySelector(".weather-icon");
  iconHTML.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png"> `;
  let minTemp = document.querySelector(`.min`);
  let maxTemp = document.querySelector(`.max`);

  minTemp.innerHTML = "🔻" + Math.round(mObj.minTemp) + celsius;
  maxTemp.innerHTML = "🔺" + Math.round(mObj.maxTemp) + celsius;
}

export function updateClock(mObj) {
  mObj.getDate();
  let hour = document.querySelector(".hour-hand");
  let minute = document.querySelector(".minute-hand");
  let second = document.querySelector(".second-hand");

  let hr = mObj.date.getHours();
  let min = mObj.date.getMinutes();
  let sec = mObj.date.getSeconds();

  //^   rotation of the hands
  let hr_rotation = (hr / 12) * 360 + (min / 60) * 30 + 90;
  let min_rotation = (min / 60) * 360 + (sec / 60) * 6 + 90;
  let sec_rotation = (sec / 60) * 360 + 90;
  //   console.log(hr_rotation);
  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
}

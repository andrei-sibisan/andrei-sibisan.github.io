import { masterObject } from "./modules/masterObject.js";

import { capture } from "./modules/capture.js";
import { updateMod, updateSearch } from "./modules/update.js";
import { showResults, res, displayData, updateClock } from "./modules/view.js";

import { gifSetter } from "./modules/weatherMap.js";
//^-------------------------------------------------------------------------
//^------------------- Weather ---------------------------------------------
//^------------------------- and -------------------------------------------
//^----------------------------- Clock -------------------------------------
//^-------------------------------------------------------------------------
let timerId = 0;
let clockTimer = 0;

console.log(masterObject);
await masterObject.getGeoLocation();

console.log(masterObject.lat, " + ", masterObject.lon);
masterObject.makeURL();
//^-------------------------------------------------------------------------
//^-------------- Initial Fetching and Capture of Data ---------------------
//^-------------------------------------------------------------------------

console.log(masterObject.url);
async function update(url) {
  document.getElementById("loader").style.display = "block";
  try {
    res.innerHTML = "";
    clearInterval(timerId);
    const response = await fetch(url);
    const data = await response.json();
    capture(data, masterObject);
    masterObject.getDate();
    masterObject.getSunriseSunset();
    displayData(masterObject);
    gifSetter(masterObject);
    document.getElementById("loader").style.display = "none";
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

await update(masterObject.url);
//~ we have correct sunrise and sunset times

//~ from this point on we have all our data from geolocation and date. good hunting!

//~ setup of update interval - 60 seconds

timerId = setInterval(update, 60000, masterObject.url);
clockTimer = setInterval(updateClock, 1000, masterObject);
//^-------------------------------------------------------------------------
//^----------------- User search functionality -----------------------------
//^-------------------------------------------------------------------------

masterObject.inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (masterObject.inputField.value === "") return;
    const max_interval = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    clockTimer = setInterval(updateClock, 1000, masterObject);
    for (let i = 1; i < max_interval; i++) {
      window.clearInterval(i);
    }

    let city = masterObject.inputField.value;
    res.innerHTML = "";
    masterObject.inputField.value = "";
    masterObject.makeSearchURL(city);
    try {
      updateSearch(masterObject.urlSearch, 0)
        .then((value) => {
          masterObject.lat = value[0];
          masterObject.lon = value[1];
          console.log(masterObject.lat, masterObject.lon);
          masterObject.makeURL();
          console.log(masterObject.url);
          update(masterObject.url);

          timerId = setInterval(update, 60000, masterObject.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
});

masterObject.inputField.addEventListener("input", () => {
  masterObject.makeSearchURL(masterObject.inputField.value);
  // masterObject.suggestions.length = 0;
  res.innerHTML = "";
  updateSearch(masterObject.urlSearch, 1)
    .then((value) => {
      showResults(value, masterObject, timerId);
    })
    .catch((error) => {
      console.log(`Error, search results is void `, error);
    });
});

// masterObject.inputField.addEventListener("blur", () => {
//   masterObject.suggestions.length = 0;
//   res.innerHTML = "";
//   res.classList.toggle(".hidden");
// });

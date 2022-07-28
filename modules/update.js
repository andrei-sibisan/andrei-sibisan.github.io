import { capture } from "./capture.js";

import { displayData, res } from "./view.js";
import { gifSetter } from "./weatherMap.js";

export async function updateMod(url, mObj) {
  document.getElementById("loader").style.display = "block";
  try {
    const response = await fetch(url);
    const data = await response.json();
    capture(data, mObj);
    console.log(mObj);
    mObj.getDate();
    mObj.getSunriseSunset();
    displayData(mObj);
    res.innerHTML = "";
    gifSetter(mObj);
    document.getElementById("loader").style.display = "none";
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

export async function updateSearch(url, toggle) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!data.length) {
      console.log(`City not found`);
      return;
    }
    if (toggle === 0) {
      return [data[0].lat, data[0].lon];
    } else if (toggle === 1) {
      return data;
    }
  } catch (err) {
    console.log(err);
    alert(err);
  }
}

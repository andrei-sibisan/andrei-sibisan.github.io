function capture(jsonObj, masterObj) {
  masterObj.lat = jsonObj.coord.lat;
  masterObj.lon = jsonObj.coord.lon;
  masterObj.weatherID = jsonObj.weather[0].id;
  masterObj.weatherMain = jsonObj.weather[0].main;
  masterObj.weatherDescr = jsonObj.weather[0].description;
  masterObj.weatherIcon = jsonObj.weather[0].icon;

  masterObj.mainTemp = jsonObj.main.temp;
  masterObj.feelsLike = jsonObj.main.feels_like;
  masterObj.minTemp = jsonObj.main.temp_min;
  masterObj.maxTemp = jsonObj.main.temp_max;
  masterObj.pressure = jsonObj.main.pressure;
  masterObj.humidity = jsonObj.main.humidity;

  masterObj.time = jsonObj.dt;
  masterObj.sunrise = jsonObj.sys.sunrise;
  masterObj.sunset = jsonObj.sys.sunset;
  masterObj.timezone = jsonObj.timezone;

  masterObj.country = jsonObj.sys.country;
  masterObj.name = jsonObj.name;
}

export { capture };

import { getCurrentPosition } from "./geolocation.js";

export const masterObject = {
  apiKey: `806818a233829c2e1d3c2dd7b39346a3`,
  units: `metric`,
  url: ``,
  urlSearch: ``,
  lat: 0,
  lon: 0,
  weatherID: 0,
  weatherMain: ``,
  weatherDescr: ``,
  weatherIcon: ``,

  mainTemp: 0,
  feelsLike: 0,
  minTemp: 0,
  maxTemp: 0,
  pressure: 0,
  humidity: 0,

  time: 0,
  sunrise: 0,
  sunset: 0,
  timezone: 0,

  country: ``,
  name: ``,

  date: 0,
  sunriseDate: 0,
  sunsetDate: 0,
  inputField: document.querySelector(".input"),
  suggestions: [],
  getDate() {
    this.date = new Date();
    let offsetUTC = this.date.getTimezoneOffset();
    this.date.setMinutes(this.date.getMinutes() + offsetUTC);
    this.date.setSeconds(this.date.getSeconds() + this.timezone);
  },
  getSunriseSunset() {
    this.sunriseDate = new Date(this.sunrise * 1000);
    this.sunsetDate = new Date(this.sunset * 1000);
    let offsetUTC = this.date.getTimezoneOffset();
    this.sunriseDate.setMinutes(this.sunriseDate.getMinutes() + offsetUTC);

    this.sunsetDate.setMinutes(this.sunsetDate.getMinutes() + offsetUTC);

    this.sunriseDate.setSeconds(this.sunriseDate.getSeconds() + this.timezone);
    this.sunsetDate.setSeconds(this.sunsetDate.getSeconds() + this.timezone);
  },
  setLat(lat) {
    this.lat = lat;
  },
  setLon(lon) {
    this.lon = lon;
  },

  makeURL() {
    this.url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=${this.units}&appid=${this.apiKey}`;
  },
  makeSearchURL(src) {
    this.urlSearch = `https://api.openweathermap.org/geo/1.0/direct?q=${src}&limit=10&appid=${this.apiKey}`;
  },
  async getGeoLocation() {
    try {
      const position = await getCurrentPosition();
      masterObject.lat = position.coords.latitude;
      masterObject.lon = position.coords.longitude;
    } catch (err) {
      console.log(err);
      alert(err);
    }
  },
};

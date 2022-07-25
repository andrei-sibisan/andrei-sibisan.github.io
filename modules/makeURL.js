const apiKey = `806818a233829c2e1d3c2dd7b39346a3`;

function makeURL(lat, lon, units) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
}

function makeSearchURL(src) {
  return `https://api.openweathermap.org/geo/1.0/direct?q=${src}&limit=10&appid=${apiKey}`;
}

export { makeURL, makeSearchURL };

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
  `Fog`,
  `https://media.giphy.com/media/l4pTrnc4kl2uupJF6/giphy.gif`
);
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
  `Fog`,
  `https://media.giphy.com/media/xT0xetq8fErCoByquk/giphy.gif`
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
dayMap.set(
  `Fog`,
  `https://giphy.com/clips/storyful-animals-dogs-funny-zfj1Q8p8ka5W5A8j2O`
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
duskMap.set(`Fog`, `https://media.giphy.com/media/l2Je9dUI5LpzfHGTe/giphy.gif`);

weatherMap.set(`night`, nightMap);
weatherMap.set(`morning`, morningMap);
weatherMap.set(`day`, dayMap);
weatherMap.set(`dusk`, duskMap);

function gifSetter(mObj) {
  let overcontainer = document.querySelector(".overcontainer");
  const timesOfDay = ["night", "morning", "day", "dusk"];
  let timeOfDay = timesOfDay[0];
  let sunrise,
    sunset = 0;

  mObj.sunriseDate.getMinutes() < 30
    ? (sunrise = mObj.sunriseDate.getHours())
    : (sunrise = mObj.sunriseDate.getHours() + 1);

  mObj.sunsetDate.getMinutes() < 30
    ? (sunset = mObj.sunsetDate.getHours())
    : (sunset = mObj.sunsetDate.getHours() + 1);

  console.log(
    `Sunrise will be: ${sunrise}:00 hours and sunset will be at ${sunset}:00 hours`
  );
  //   console.log(timeOfDay);
  let hr = mObj.date.getHours();
  console.log(`current time: ${hr}`);
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
  let background = weatherMap.get(timeOfDay).get(mObj.weatherMain);

  overcontainer.style.backgroundImage = `url(${background})`;
  overcontainer.style.backgroundSize = `cover`;
  overcontainer.style.backgroundPosition = "center";
}

export { gifSetter };

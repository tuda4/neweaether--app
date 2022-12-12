let searchClean = document.querySelector('.search__clean');
let input = document.querySelector('#search__input');

// Select elements

let weatherStatus = document.querySelector('.weather__status');
let weatherTemperature = document.querySelector('.weather__temperature');
let weatherIcon = document.querySelector('#weather__icon');
let city = document.querySelector('.location--city');
let country = document.querySelector('.location--country');
let windSpeed = document.querySelector('.wind__status h1');
let humidity = document.querySelector('.humidity__status h1');
let sunriseTime = document.querySelector('.sunrise--time');
let sunsetTime = document.querySelector('.sunset--time');
let pressure = document.querySelector('.pressure__status h1');
let timer = document.querySelector('.weather__time span');

const defaultValue = '--';
const appId = '18521d29cb598e0cd9135f51915d5dcd';

searchClean.addEventListener('click', function () {
  input.value = '';
});
input.addEventListener('change', function (e) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${appId}&units=metric&lang=vi`
  )
    .then(async (res) => {
      const data = await res.json();
      weatherStatus.innerHTML = data.weather[0].description || defaultValue;
      weatherTemperature.innerHTML =
        `${Math.round(data.main.temp)}&#8451;` || defaultValue;
      weatherIcon.setAttribute(
        `src`,
        `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      ) || defaultValue;
      city.innerHTML = data.name || defaultValue;
      country.innerHTML = data.sys.country || defaultValue;
      windSpeed.innerHTML =
        `${(data.wind.speed * 3.6).toFixed(2)}<span>km/h</span>` ||
        defaultValue;
      humidity.innerHTML =
        `${data.main.humidity}<span>%</span>` || defaultValue;
      pressure.innerHTML =
        `${data.main.pressure}<span>hPa</span>` || defaultValue;
      sunriseTime.innerHTML = moment
        .unix(data.sys.sunrise - (25200 - data.timezone))
        .format('H:mm');
      sunsetTime.innerHTML = moment
        .unix(data.sys.sunset - (25200 - data.timezone))
        .format('H:mm');
      timer.innerHTML = moment
        .unix(data.dt - (25200 - data.timezone))
        .format('H:mm');
      document.title = data.name;
      (function () {
        var link =
          document.querySelector("link[rel*='icon']") ||
          document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementsByTagName('head')[0].appendChild(link);
      })();
    })
    .catch(() => {
      weatherStatus.innerHTML = 'Địa điểm của bạn không có';
    });
});

// Текущая дата и время
let now = new Date();
let hours = now.getHours();
let min = now.getMinutes();
let day = now.getDay();
let date = now.getDate();
let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let curTime = document.querySelector("#current-time");
let apiKey = "73bfd2ae5939a4df8f8990461d435a84";

let hours0 = "00";
let min0 = "00";

if (hours < 10) {
  hours0 = `0${hours}`;
} else {
  hours0 = `${hours}`;
}

if (min < 10) {
  min0 = `0${min}`;
} else {
  min0 = `${min}`;
}
curTime.innerHTML = `${hours0}:${min0}`;

let curDay = document.querySelector(".current-date");
curDay.innerHTML = `${days[day]} ${date}`;

let yesterday = document.querySelector(".yesterday");
yesterday.innerHTML = `${days[day - 1]} ${date - 1}`;

let tomorrow = document.querySelector(".tomorrow");
if (days[day + 1] === undefined) {
  tomorrow.innerHTML = `${days[0]} ${date + 1}`;
} else {
  tomorrow.innerHTML = `${days[day + 1]} ${date + 1}`;
} //

// Поиск города
let cityInput = document.querySelector("#city-input");
let changedCity = document.querySelector("#changedCity");

function searching(event) {
  event.preventDefault();

  cityUrl = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityUrl}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", searching);
//

//предложенные города
function clickCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}
let kyiv = document.querySelector(".kyiv");
kyiv.addEventListener("click", () => clickCity("kyiv"));

let warszawa = document.querySelector(".warszawa");
warszawa.addEventListener("click", () => clickCity("warszawa"));

let paris = document.querySelector(".paris");
paris.addEventListener("click", () => clickCity("paris"));

let ottawa = document.querySelector(".ottawa");
ottawa.addEventListener("click", () => clickCity("ottawa"));
//

//Цельсии в Фаренгейты и наоборот
function calcFahr(e) {
  if (e.target === fahrenheit) {
    let city = changedCity.textContent;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(showTemp);

    unit.innerHTML = "°F";
  }

  //удаляю/добавляю стили
  celsius.classList.toggle("active-temp");
  fahrenheit.classList.toggle("active-temp");

  this.removeEventListener("click", calcFahr);
  celsius.addEventListener("click", calcCels);
}
function calcCels(e) {
  if (e.target === celsius) {
    let city = changedCity.textContent;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);

    unit.innerHTML = "°C";
  }

  //удаляю/добавляю стили
  fahrenheit.classList.toggle("active-temp");
  celsius.classList.toggle("active-temp");

  this.removeEventListener("click", calcCels);
  fahrenheit.addEventListener("click", calcFahr);
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
let unit = document.querySelector("#today-units");

fahrenheit.addEventListener("click", calcFahr);

//температура API
let curTemp = document.querySelector("#temp");
//ветер, влажность(нужна вероятность осадков), максимальная температура
let wind = document.querySelector("#wind");
let hum = document.querySelector("#humidity");
let maxTemp = document.querySelector("#max-temp");

function showTemp(response) {
  let currTemp = Math.round(response.data.main.temp);
  let currCity = response.data.name.toUpperCase();
  changedCity.innerHTML = currCity;
  curTemp.innerHTML = currTemp;
  wind.innerHTML = Math.round(response.data.wind.speed);
  hum.innerHTML = response.data.main.humidity;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max); //как заменять °C на °F, и наоборот??
}

function currentPos(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let coordsUrl = `lat=${lat}&lon=${lon}`;
  cityURL = coordsUrl;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${coordsUrl}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function geoloc() {
  navigator.geolocation.getCurrentPosition(currentPos);
}
geoloc();

let buttCurr = document.querySelector("#current-buttom");
buttCurr.addEventListener("click", geoloc);
//

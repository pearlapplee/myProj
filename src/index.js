// Текущая дата и время
let now = new Date();
let hours = now.getHours();
let min = now.getMinutes();
let day = now.getDay();
let date = now.getDate();
let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
let curTime = document.querySelector("#current-time");
let apiKey = "73bfd2ae5939a4df8f8990461d435a84";

// time
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
//

let curDay = document.querySelector(".current-date");
curDay.innerHTML = `${days[day]} ${date}`;

let yesterday = document.querySelector(".yesterday");
if (days[day - 1] === undefined) {
  yesterday.innerHTML = `${days[6]} ${date - 1}`;
} else {
  now.setDate(date - 1);
  yesterday.innerHTML = `${days[day - 1]} ${now.getDate()}`;
}

let tomorrow = document.querySelector(".tomorrow");
if (days[day + 1] === undefined) {
  tomorrow.innerHTML = `${days[0]} ${date + 1}`;
} else {
  now.setDate(date + 1);
  tomorrow.innerHTML = `${days[day + 1]} ${now.getDate()}`;
}
//

// Поиск города
let cityInput = document.querySelector("#city-input");
let changedCity = document.querySelector("#changedCity");

function searching(event) {
  event.preventDefault();
  search(cityInput.value);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);

  bugFixWithFahr();
}

let searchForm = document.querySelector("#searching");
searchForm.addEventListener("submit", searching);
//

//предложенные города
function clickCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
  bugFixWithFahr();
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
    addFahrenheit();
  }
}
function addFahrenheit() {
  unit.innerHTML = "°F";
  unitSpeed.innerHTML = "mph";
  //удаляю/добавляю стили
  celsius.classList.remove("active-temp");
  fahrenheit.classList.add("active-temp");
}

function bugFixWithFahr() {
  if (fahrenheit.classList.contains("active-temp")) {
    addCelsius();
  }
}

function calcCels(e) {
  if (e.target === celsius) {
    // clickCity(changedCity.textContent);
    let city = changedCity.textContent;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemp);
    addCelsius();
  }
}

function addCelsius() {
  unit.innerHTML = "°C";
  unitSpeed.innerHTML = "m/s";
  //удаляю/добавляю стили
  fahrenheit.classList.remove("active-temp");
  celsius.classList.add("active-temp");
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");
let unit = document.querySelector("#today-units");
let unitSpeed = document.querySelector("#unit-speed");

fahrenheit.addEventListener("click", calcFahr);
celsius.addEventListener("click", calcCels);

//температура API
let curTemp = document.querySelector("#temp");
//ветер, влажность(нужна вероятность осадков), максимальная температура, icon
let wind = document.querySelector("#wind");
let hum = document.querySelector("#humidity");
let maxTemp = document.querySelector("#max-temp");
let icon = document.querySelector("#icon");
let description = document.querySelector("#description");

let currTemp = null; //делает так что не нужно каждый раз удалять/добавлять ивент-листенер

function showTemp(response) {
  console.log(response);
  let currTemp = Math.round(response.data.main.temp);
  currCity = response.data.name.toUpperCase();
  let iconApi = response.data.weather[0].icon;
  let iconDescription = response.data.weather[0].description;

  changedCity.innerHTML = currCity;
  curTemp.innerHTML = currTemp;
  wind.innerHTML = Math.round(response.data.wind.speed);
  hum.innerHTML = response.data.main.humidity;
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconApi}@2x.png`
  );
  icon.setAttribute("alt", `${iconDescription}`);
  description.innerHTML = iconDescription;
}

function currentPos(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let coordsUrl = `lat=${lat}&lon=${lon}`;
  cityURL = coordsUrl;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?${coordsUrl}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
  bugFixWithFahr();
}

function geoloc() {
  navigator.geolocation.getCurrentPosition(currentPos);
}
geoloc();

let buttCurr = document.querySelector("#current-buttom");
buttCurr.addEventListener("click", geoloc);
//

function addForecastForNextWeek() {
  nextWeek.classList.toggle("activee");
  if (nextWeek.classList.contains("activee")) {
    nextWeek.classList.remove("week-hover");
    dayWeather.classList.add("hide");
  } else {
    nextWeek.classList.add("week-hover");
    dayWeather.classList.remove("hide");
  }
}

let nextWeek = document.querySelector("#week");
nextWeek.addEventListener("click", addForecastForNextWeek);
let dayWeather = document.querySelector("#day-weather");

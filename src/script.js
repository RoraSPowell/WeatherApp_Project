function formatDate(dateNow) {
  let date = now.getDate();
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let minute = now.getMinutes();

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let month = months[now.getMonth()];

  let formatDate = `${month} ${date}, ${year}
  ${day} ${hour}:${minute} `;

  return formatDate;
}

let now = new Date();
let today = document.querySelector("h5#date");
today.innerHTML = formatDate(now);

function showTemp(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);

  fahrenheitTemp = response.data.main.temp;

  document.querySelector("h4#city").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = Math.round(fahrenheitTemp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "20e37d41a4e67f65c6c33caa40e9d0f9";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "imperial";
  let apiURL = `${endpoint}q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function searchLocal(position) {
  let apiKey = "20e37d41a4e67f65c6c33caa40e9d0f9";
  let endpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let unit = "imperial";
  let apiURL = `${endpoint}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showTemp);
}

function displayLocal(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocal);
}

function convertToCelcius(event) {
  event.preventDefault();
  let celciusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  document.querySelector("#cityTemp").innerHTML = celciusTemp;
  tempConvertC2F.classList.remove("active");
  tempConvertF2C.classList.add("active");
}

function convertToFahrenheit(event) {
  event.preventDefault();
  document.querySelector("#cityTemp").innerHTML = Math.round(fahrenheitTemp);
  tempConvertF2C.classList.remove("active");
  tempConvertC2F.classList.add("active");
}

let fahrenheitTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let localInfo = document.querySelector("#localButton");
localInfo.addEventListener("click", displayLocal);

let tempConvertF2C = document.querySelector("#convertCel");
tempConvertF2C.addEventListener("click", convertToCelcius);

let tempConvertC2F = document.querySelector("#convertFah");
tempConvertC2F.addEventListener("click", convertToFahrenheit);

searchCity("New York");

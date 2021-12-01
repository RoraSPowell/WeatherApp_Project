//1
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
  ${day} ${hour}:${minute}  `;

  return formatDate;
}

let now = new Date();
let today = document.querySelector("h5#date");
today.innerHTML = formatDate(now);

////////////////////////API//////////////////////////////////////////////
//Make an API call to OpenWeather API
//Once get the response, display city name and temperature
function showTemp(response) {
  console.log(response.data);
  document.querySelector("h4#city").innerHTML = response.data.name;
  document.querySelector("#cityTemp").innerHTML = Math.round(
    response.data.main.temp
  );
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

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let localInfo = document.querySelector("#localButton");
localInfo.addEventListener("click", displayLocal);

searchCity("New York");

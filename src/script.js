//Date and time local
let now = new Date();

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function formatDate(dateShow) {
  let dateAll = document.querySelector("#date-time");
  let hours = dateShow.getHours();
  let minutes = dateShow.getMinutes();
  let date = dateShow.getDate();
  hours = checkTime(hours);
  minutes = checkTime(minutes);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateShow.getDay()];
  let months = [
    "January",
    "Fabruary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];
  let month = months[dateShow.getMonth()];

  dateAll.innerHTML = `${month} ${date}, ${day}, ${hours}:${minutes}`;
  return dateAll.innerHTML;
}
formatDate(now);

//Celsius and Fahrenheit units changer by click

function celsius(event) {
  event.preventDefault();
  let changeTemperatureOne = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  changeTemperatureOne.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsius);

function fahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let changeTemperatureOne = document.querySelector("#temperature");
  changeTemperatureOne.innerHTML = Math.round(celsiusTemperature * 1.8) + 32;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheit);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row">
          <div class="col-2">
            <div class = "day-forecast">${day}</div>
               <img src ="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" width="42"/>
            <div class="temperature-forecast">
              <span class="temperature-forecast-max">22°</span>
              <span class="temperature-forecast-min">18°</span>
           </div>
           </div>
           </div>
    </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Search engine and changes according to API
function weather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `./images/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function search(city) {
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Current location and weather button
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(weather);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentButton");
button.addEventListener("click", getPosition);

let celsiusTemperature = null;

search("Kyiv");
displayForecast();

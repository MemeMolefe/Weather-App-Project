function showTemperature(response) {
    let data = response.data;
    let currentCity = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#temperature-icon");
    let timeElement = document.querySelector("#current-date-info");
    let date = new date(response.data.time * 1000)
}

timeElement.innerHTML = formatDate(date);
currentCity.innerHTML = data.city;
temperatureElement.innerHTML = Math.round(data.temperature.current);
humidityElement.innerHTML = `${data.temperature.humidity}%`;
windSpeedElement.innerHTML = `${Math.round(data.wind.speed)} km/h`;
descriptionElement.innerHTML = data.condition.description;
iconElement.setAttribute("src", data.condition.icon_url);

getForecast(response.data.city);

function getWeatherData(city) {
  let apiKey = "4969d34abda55c6b0ec77t03a1b32of6";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function updatecity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-city");
    let city = searchInput.value;
    getWeatherData(city);
}

function formateDate(date) {
    let day = date.getDay();

    days = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
    let newDay = days[day];

    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) { 
        minutes = `0$(minutes)`;
    }

    return `${newDay} ${hours}: ${minutes}`;
}

function formateDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = "4969d34abda55c6b0ec77t03a1b32of6";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHTML = "";

    response.data.daily.forEach(function (day, index) {
        if (index > 0 && index < 6) {

            forecastHTML = forecast +
            `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formateDay(day.time)}</div>
                    <img src="${day.condition.icon_url}" 
                      class="weather-forecast-icon">
                    <div class="weather-forecast-temperatures">
                      <div class="weather-forecast-temperature">
                                <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
                      </div>
                            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}&deg;</div>
                    </div>
                </div>
             ` ;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
}

let changecity = document.querySelector("#search-form");
changecity.addEventListener("submit", updateCity);
getWeatherData("Johannesburg");
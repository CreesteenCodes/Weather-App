const apiKey = "c02700b0a11db4908a540fee93b08679";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const placeholder = document.getElementById("placeholder");
const weatherInfo = document.getElementById("weatherInfo");

const cityName = document.getElementById("cityName");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
    }
});

async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
    return;
    }

    placeholder.classList.add("hidden");
    weatherInfo.classList.remove("hidden");

    const now = new Date();
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', options);
    date.textContent = formattedDate;


    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].main;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;

    const precipitationEl = document.getElementById("precipitation");
    let precipitation = 0;
    if (data.rain && data.rain["1h"]) precipitation = data.rain["1h"];
    else if (data.rain && data.rain["3h"]) precipitation = data.rain["3h"];
    else if (data.snow && data.snow["1h"]) precipitation = data.snow["1h"];
    else if (data.snow && data.snow["3h"]) precipitation = data.snow["3h"];
    precipitationEl.textContent = `${precipitation} mm`;

    const weatherIcon = document.getElementById("weatherIcon");
    const mainCondition = data.weather[0].main.toLowerCase();
    let iconName = "partly-sunny-outline";
    if (mainCondition.includes("cloud")) iconName = "cloudy-outline";
    else if (mainCondition.includes("rain")) iconName = "rainy-outline";
    else if (mainCondition.includes("clear")) iconName = "sunny-outline";
    else if (mainCondition.includes("storm") || mainCondition.includes("thunder")) iconName = "thunderstorm-outline";
    else if (mainCondition.includes("snow")) iconName = "snow-outline";
    else if (mainCondition.includes("mist") || mainCondition.includes("fog")) iconName = "cloudy-outline";
    weatherIcon.setAttribute("name", iconName);
}
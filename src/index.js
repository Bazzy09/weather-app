require('dotenv').config();

const apiKey = process.env.API_KEY;

document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById('weather-form');
    const locationInput = document.getElementById('location-input');
    const weatherTypeSelect = document.getElementById('weather-type');
    const forecastDaysInput = document.getElementById('forecast-days');
    const loading = document.getElementById('loading');
    const weatherInfo = document.getElementById('weather-info');

    weatherForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const location = locationInput.value;
        const weatherType = weatherTypeSelect.value;

        if (weatherType === 'current') {
            getWeatherData(location, 'current');
        } else if (weatherType === 'forecast') {
            const numDays = forecastDaysInput.value;
            getWeatherData(location, 'forecast', numDays);
        }
    });
});

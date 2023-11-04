document.addEventListener("DOMContentLoaded", function () {
    const apiKey = config.API_KEY;
    const weatherForm = document.getElementById('weather-form');
    const locationInput = document.getElementById('location-input');
    const weatherTypeSelect = document.getElementById('weather-type');
    const forecastDaysInput = document.getElementById('forecast-days');
    const loading = document.getElementById('loading');
    const weatherInfo = document.getElementById('weather-info');
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

    weatherForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const location = locationInput.value;
        const weatherType = weatherTypeSelect.value;

        if (weatherType === 'current') {
            getWeatherData(location, 'current', apiKey);
        } else if (weatherType === 'forecast') {
            const numDays = forecastDaysInput.value;
            getWeatherData(location, 'forecast', numDays, apiKey);
        }
    });
});

function getWeatherData(location, weatherType, numDays, apiKey) {
    loading.style.display = 'block';

    let apiUrl;

    if (weatherType === 'current') {
        apiUrl = `https://api.weatherapi.com/current-weather?location=${location}&apiKey=${apiKey}`;
    } else if (weatherType === 'forecast') {
        apiUrl = `https://api.weatherapi.com/forecast?location=${location}&numDays=${numDays}&apiKey=${apiKey}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = processWeatherData(data);
            displayWeatherInfo(weatherData);

            loading.style.display = 'none';
            console.log(loading.style);
        })
        .catch(error => {
            loading.style.display = 'none';
            console.error('Error fetching weather data:', error);
        });
}
function processWeatherData(data) {
    const processedData = {
        location: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed,
    };

    return processedData;
}

const API_KEY = 'e5e53b7a3d5bfb2fb2d02e77902027b0';

const LAT = 5.541536347066202;
const LON = -0.2643235793911444;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=imperial&appid=${API_KEY}`;

const apiFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            return await response.json();
        }
        throw new Error(await response.text());
    } catch (error) {
        console.log(error);
        return null;
    }
};

function displayCurrentWeather(data) {
    const container = document.getElementById('weather-container');

    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const description = data.weather[0].description;

    const current = document.createElement('div');
    current.className = 'weather-current';
    current.innerHTML = `
      <img src="${iconSrc}" alt="${description}">
      <div>
        <p class="weather-temp">${data.main.temp.toFixed(0)}&deg;F</p>
        <p class="weather-desc">${description}</p>
      </div>
    `;

    container.appendChild(current);
}

function displayForecast(data) {
    const container = document.getElementById('weather-container');

    const forecastWrapper = document.createElement('div');
    forecastWrapper.className = 'weather-forecast';

    const noonReadings = data.list.filter(reading => reading.dt_txt.includes('12:00:00'));
    const nextThreeDays = noonReadings.slice(0, 3);

    nextThreeDays.forEach(reading => {
        const date = new Date(reading.dt_txt);
        const dayLabel = date.toLocaleDateString('en-US', { weekday: 'short' });

        const dayCard = document.createElement('div');
        dayCard.className = 'forecast-day';
        dayCard.innerHTML = `
          <span class="day-label">${dayLabel}</span>
          <span class="day-temp">${reading.main.temp.toFixed(0)}&deg;F</span>
        `;
        forecastWrapper.appendChild(dayCard);
    });

    container.appendChild(forecastWrapper);
}

async function loadWeather() {
    const currentData = await apiFetch(currentUrl);
    if (currentData) displayCurrentWeather(currentData);

    const forecastData = await apiFetch(forecastUrl);
    if (forecastData) displayForecast(forecastData);
}

loadWeather();
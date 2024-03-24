import { requestCurrentWeather } from './APIController';
import { convertUnits, getUnits } from './utils';

async function getSearch(value, unit) {
	const errorText = document.querySelector('.error');
	let weather;

	try {
		errorText.textContent = '';
		weather = await requestCurrentWeather(value, unit);
	} catch (err) {
		errorText.textContent =
			'The location can\'t be found! Try "City, Country" format!';
	}
	return weather;
}

function renderMainInfo(weatherInfo) {
	const countryText = document.querySelector('.country');
	const dateText = document.querySelector('.date');
	const timeText = document.querySelector('.time');
	const tempText = document.querySelector('.temperature');

	countryText.textContent = weatherInfo.name;
	dateText.textContent = weatherInfo.time.date;
	timeText.textContent = weatherInfo.time.time;
	tempText.textContent = `${weatherInfo.temps.temp} °${getUnits(document.querySelector('.temperature-abbreviation').dataset.temp)}`;
}

function renderDisplay(weatherInfo) {
	const weatherImage = document.querySelector('.weather-icon');
	const description = document.querySelector('.description');
	weatherImage.src = `https://openweathermap.org/img/wn/${weatherInfo.weather.icon}.png`
	description.textContent = weatherInfo.weather.description;
}

function renderSecondaryInfo(weatherInfo) {
	const humidity = document.querySelector('.humidity');
	const feelsLike = document.querySelector('.feels-like');
	humidity.textContent = `${weatherInfo.temps.humidity} %`;
	feelsLike.textContent = `${weatherInfo.temps.feelsLike} °${getUnits(document.querySelector('.temperature-abbreviation').dataset.temp)}`;
}

function renderMainDisplay(weatherInfo) {
	renderMainInfo(weatherInfo);
	renderDisplay(weatherInfo);
	renderSecondaryInfo(weatherInfo);
}

function init() {
	const searchBox = document.querySelector('#search');
	const tempButton = document.querySelector('.temperature-abbreviation');
	let weatherData;

	getSearch('Thailand').then((res) => {
		if (res) {
			weatherData = res;
			renderMainDisplay(weatherData);
		}
	});

	searchBox.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			getSearch(searchBox.value, tempButton.dataset.temp).then(
				(res) => {
					if (res) {
						weatherData = res;
						renderMainDisplay(weatherData);
					}
				}
			);
		}
	});

	tempButton.addEventListener('click', () => {
		if (tempButton.dataset.temp === 'metric') {
			tempButton.dataset.temp = 'imperial';
			tempButton.textContent = 'Display: °F';
		} else {
			tempButton.dataset.temp = 'metric';
			tempButton.textContent = 'Display: °C';
		}
		weatherData.temps.temp = convertUnits(
			tempButton.dataset.temp,
			weatherData.temps.temp
		);
		renderMainDisplay(weatherData);
	});
}

export default init;

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

function mainInfo(weatherInfo) {
	const countryText = document.querySelector('.country');
	const dateText = document.querySelector('.date');
	const timeText = document.querySelector('.time');
	const tempText = document.querySelector('.temperature');

	countryText.textContent = weatherInfo.name;
	dateText.textContent = weatherInfo.time.date;
	timeText.textContent = weatherInfo.time.time;
	tempText.textContent = `${weatherInfo.temps.temp} °${document.querySelector('.temperature-abbreviation').dataset.temp}`;
}

function displayInfo(weatherInfo) {
	return weatherInfo;
}

function secondaryInfo(weatherInfo) {
	return weatherInfo;
}

function mainDisplay(weatherInfo) {
	mainInfo(weatherInfo);
	displayInfo(weatherInfo);
	secondaryInfo(weatherInfo);
}

function changeInfo(weatherInfo) {
	mainDisplay(weatherInfo);
}

function init() {
	const searchBox = document.querySelector('#search');
	const tempButton = document.querySelector('.temperature-abbreviation');
	let weatherData;

	getSearch('Thailand').then((res) => {
		if (res) {
			weatherData = res;
			changeInfo(weatherData);
		}
	});

	searchBox.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			getSearch(searchBox.value, getUnits(tempButton.dataset.temp)).then(
				(res) => {
					if (res) {
						weatherData = res;
						changeInfo(weatherData);
					}
				}
			);
		}
	});

	tempButton.addEventListener('click', () => {
		if (tempButton.dataset.temp === 'C') {
			tempButton.dataset.temp = 'F';
			tempButton.textContent = 'Display: °F';
		} else {
			tempButton.dataset.temp = 'C';
			tempButton.textContent = 'Display: °C';
		}
		weatherData.temps.temp = convertUnits(
			tempButton.dataset.temp,
			weatherData.temps.temp
		);
		changeInfo(weatherData);
	});
}

export default init;

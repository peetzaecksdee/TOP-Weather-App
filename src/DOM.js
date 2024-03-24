import { requestCurrentWeather } from './APIController';

async function getSearch(value) {
	const errorText = document.querySelector('.error');
	let weather;

	try {
		errorText.textContent = '';
		weather = await requestCurrentWeather(value);
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
	tempText.textContent = `${weatherInfo.temps.temp} °C`;
}

function init() {
	const searchBox = document.querySelector('#search');
	const tempButton = document.querySelector('.temperature-abbreviation');

	getSearch('Thailand').then((res) => {
		if (res) mainInfo(res);
	});

	searchBox.addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			getSearch(searchBox.value).then((res) => {
				if (res) mainInfo(res);
			});
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
	});
}

export default init;

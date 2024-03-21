import { formatDate, fromUnixTime } from 'date-fns';

const key = '18cf709d930f9c70d31238613b8b992a';

function formatCityName(name) {
	return name
		.replace(/(\s+$|^\s+)/g, '')
		.replace(/(,\s+)/g, ',')
		.replace(/(\s+,)/g, ',')
		.replace(/\s+/g, '+');
}

async function fetchData(url) {
	try {
		const response = await fetch(url);
		if (response.status !== 200 || !response.ok)
			throw new Error(
				`Fail to reach the API with status ${response.status} \n${response.json().then((res) => res.message)}.`
			);

		const json = await response.json();
		return json;
	} catch (err) {
		throw new Error(err);
	}
}

async function requestCoordinate(query = 'Thailand') {
	const coordinateData = await fetchData(
		`http://api.openweathermap.org/geo/1.0/direct?q=${formatCityName(query)}&appid=${key}`
	);

	return {
		lat: coordinateData[0].lat,
		lon: coordinateData[0].lon,
	};
}

async function requestCurrentWeather(lat, lon, unit = 'metric') {
	const weatherData = await fetchData(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`
	);
	
	return {
		name: weatherData.name,
		country: weatherData.sys.country,
		weather: {
			description: weatherData.weather[0].description,
			icon: weatherData.weather[0].icon,
		},
		temps: {
			temp: weatherData.main.temp,
			feelsLike: weatherData.main.feels_like,
			min: weatherData.main.temp_min,
			max: weatherData.main.temp_max,
			humidity: weatherData.main.humidity,
		},
		time: {
			date: formatDate(
				fromUnixTime(weatherData.dt + weatherData.timezone),
				'EEEE, d MMM y'
			),
			time: formatDate(
				fromUnixTime(weatherData.dt + weatherData.timezone),
				'pp'
			),
		},
	};
}

async function requestForecast(lat, lon, unit = 'metric') {
	const forecastData = await fetchData(
		`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`
	);
	
	return forecastData.list;
}

export { requestCurrentWeather, requestCoordinate, requestForecast };

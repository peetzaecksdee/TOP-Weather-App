async function requestMaker(query = 'USA') {
	let weatherData;

	try {
		const response = await fetch(
			`https://api.weatherapi.com/v1/current.json?key=95fac557f53c4159ad8130137241703&q=${query}`
		);
		if (response.status !== 200 || !response.ok) throw new Error(`Fail to reach the API with status ${response.status}.`);

		weatherData = await response.json();
	} catch (err) {
		throw new Error(err);
	}

  return {
    name: weatherData.location.name,
    region: weatherData.location.region,
    country: weatherData.location.country,
    localtime: weatherData.location.localtime,

    is_day: weatherData.current.is_day,
    tempC: weatherData.current.temp_c,
    tempF: weatherData.current.temp_f,
    lastUpdated: weatherData.current.last_updated,

    condition: weatherData.current.condition.text,
    windM: weatherData.current.wind_mph,
    windK: weatherData.current.wind_kph,
    windDegree: weatherData.current.wind_degree,
    windDir: weatherData.current.wind_dir,
  }
}

export default requestMaker;

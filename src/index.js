async function getWeatherData(location) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=777eb91a46f021e3a9a72671b9b613b9`, {mode: 'cors'});
    const data = await response.json();

    const ret = {
      name: data['name'],
      weatherMain: data['weather'][0]['main'],
      weatherDesc: data['weather'][0]['description'],
      temp: data['main']['temp'],
      feltTemp: data['main']['feels_like'],
      humidity: data['main']['humidity'],
      wind: data['wind']['speed'],
    };

    return ret;
  } catch(err) {
    throw err;
  }
}

const display = (() => {
  const cityName = document.querySelector('#city');
  const weatherMain = document.querySelector('#weather_main');
  const weatherDesc = document.querySelector('#weather_desc');
  const tempMain = document.querySelector('#temp_main');
  const feltTemp = document.querySelector('#felt_temp');
  const humidity = document.querySelector('#humidity');
  const windSpeed = document.querySelector('#wind_speed');

  function updateWeather(location) {
    getWeatherData(location)
      .then(res => {
        cityName.textContent = res['name'];
        weatherMain.textContent = res['weatherMain'];
        weatherDesc.textContent = res['weatherDesc'];

        // Temperature is in degrees celcius by default
        const celsius = Math.round((res['temp'] - 273.15) * 100) / 100
        const feltCelsius = Math.round((res['feltTemp'] - 273.15) * 100) / 100
        tempMain.textContent = `${celsius}°`;
        feltTemp.textContent = `${feltCelsius}°`;
        humidity.textContent = res['humidity'];
        windSpeed.textContent = res['wind'];
      }).catch(() => {
        alert('Location not found!');
      });
  }

  return {updateWeather};
})();

searchForm = document.forms['searchForm'];
searchForm.addEventListener('submit', () => {
  display.updateWeather(searchForm['city'].value);
});

// Default on-start
display.updateWeather('London')
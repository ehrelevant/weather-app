async function getWeatherData(location) {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=777eb91a46f021e3a9a72671b9b613b9`, {mode: 'cors'});
    const resData = await response.json();
    const weather = resData.weather[0];

    return weather;
  } catch(err) {
    alert(`${err} || Could not find: "${location}"`);
  }
}

getWeatherData('London')
  .then(res => {
    console.log(res);
  });
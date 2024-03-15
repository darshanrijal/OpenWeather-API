function showPosition(position) {
  if (position && position.coords) {
    const api = document.getElementById("api_data");
    const key = "d08c75e47d6009d524b107271531bf49";

    window.lat = position.coords.latitude;
    window.lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let temp = data.main.temp;
        console.log(`${temp - 273}C`);
      })
      .catch((error) => console.error("Error:", error));
  } else {
    console.log("Position object is undefined.");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}

function fetchCity() {
  const apiKey = "d08c75e47d6009d524b107271531bf49";
  const city = document.getElementById("forminput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let temp = Math.round(data.main.temp);
      let feelsLike = Math.round(data.main.feels_like);
      max = Math.round(data.main.temp_max);
      //   min = Math.round(data.main.temp_min);
      let Description = data.weather[0].description;
      let wind = data.wind.speed;
      let windDir = data.wind.deg;
      console.log(`${temp - 273}C`);
      document.getElementById(
        "api_data"
      ).innerHTML = `Description:${Description}<br>${
        temp - 273
      }C<br>Feels Like:${feelsLike - 273}C<br>
    Max Temp:${
      max - 273
    }C<br>wind direction:${windDir} deg<br>Wind Speed=${wind} KMPH`;
    })
    .catch(
      (error) =>
        (document.getElementById(
          "api_data"
        ).innerHTML = `Invalid Input, Check spelling or Whitespaces`)
    );
}

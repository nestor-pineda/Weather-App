// DOM manipulation
const cityForm = document.querySelector("form");

const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  // const cityDetails = data.cityDetails;
  // const weather = data.weather;

  // Object Destructuring!
  const { cityDetails, weather } = data;

  // update details template
  details.innerHTML = `
  <h5 class="my-3 name">${cityDetails.EnglishName}</h5>
  <div class="my-3">${weather.WeatherText}</div>
  <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
</div>
`;

  //Update night/day image & icon
  // Ternary operator !
  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  // let timeSrc = null;

  // if (weather.IsDayTime) {
  //   timeSrc = "img/day.svg";
  // } else {
  //   timeSrc = "img/night.svg";
  // }
  // time.setAttribute("src", timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // remove d-none class if search
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  console.log(city);
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  // return {
  //   cityDetails: cityDetails,
  //   weather: weather,
  // };
  // Object shorthand notation
  return { cityDetails, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default refresh action

  //get the city value "name="city"" and cliean it. The trim() method removes whitespace from both sides of a string.
  const city = cityForm.city.value.trim();
  cityForm.reset(); // Cleans th input feald

  // update the info in the browser
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err.message));
});

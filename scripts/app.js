// 1. DOM manipulation variables
const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
// We call the Forecast Class constructor in forcast.js
const forecast = new Forecast();

//6. function that passes the info to the browser
const updateUI = (data) => {
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

  // Update night/day image & icon
  // Ternary operator !
  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
  time.setAttribute("src", timeSrc);

  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  // remove d-none class if search
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

//2. Capture the Submit Event Listener
cityForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default refresh action

  //get the city value "name="city"" and cliean it. The trim() method removes whitespace from both sides of a string.
  const city = cityForm.city.value.trim();
  cityForm.reset(); // Cleans th input feald

  //3. invokes the function that updates the city information when typed by passing the name of the city.
  forecast
    .updateCity(city)
    //5. updateCity is asynchronous so it returns a promise. When thw city info is ready, we invoke que updateUI function that shows the info in the browser.
    .then((data) => updateUI(data))
    .catch((err) => console.log(err.message));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  forecast
    .updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

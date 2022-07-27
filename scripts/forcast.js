// API logic
const key = "TX1lL9OU0n2XBVWL9zBbXKhw3PHTFobX";

// Get weather information
const getWeather = async (id) => {
  const baseUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(baseUrl + query);
  const data = await response.json();

  return data[0];
};

// Get city information
const getCity = async (city) => {
  const baseUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;
  const response = await fetch(baseUrl + query);
  const data = await response.json();

  return data[0]; //We are only interested in the first object of the data array
};

// getCity("madrid")
//   .then((data) => {
//     return getWeather(data.Key);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err.message));

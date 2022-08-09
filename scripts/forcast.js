// We are ancapsulating in a Class everythong that has to do with the forcast API call.

class Forecast {
  constructor() {
    this.key = "TX1lL9OU0n2XBVWL9zBbXKhw3PHTFobX";
    this.weatherUrl = "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityUrl = "http://dataservice.accuweather.com/locations/v1/cities/search";
  }

  // Get city information
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityUrl + query);
    const data = await response.json();
    return data[0]; //We are only interested in the first object of the data array
  }

  // Get weather information
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherUrl + query);
    const data = await response.json();
    return data[0];
  }

  // Updates the demanded city information when typed.
  async updateCity(city) {
    //We create two objects witht the fetched information.
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }
}

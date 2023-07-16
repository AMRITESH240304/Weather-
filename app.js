class WeatherApp {
  constructor() {
    this.searchButton = document.getElementsByClassName("btn-outline-success")[0];
    this.place = document.getElementsByClassName("display-5")[0];

    this.searchButton.addEventListener("click", this.searchWeather.bind(this));
  }

  searchWeather() {
    const APIkey = "Your APIkey";
    const city = document.getElementById("city-input").value;
    if (city === "") {
      alert("Empty Search box");
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
    )
      .then((response) => response.json())
      .then((json) => {
        if (json.cod === "404") {
          alert("Wrong city or country");
          this.place.innerHTML = "Wrong input";
          return;
        } else {
          this.place.innerHTML = `Weather of ${city}`;
        }

        // Update weather information
        const weatherData = {
          temperature: `${parseInt(json.main.temp)}°C`,
          humidity: `${parseInt(json.main.humidity)}%`,
          country: `Country: ${json.sys.country}`,
          minTemp: `${parseInt(json.main.temp_min)}°C`,
          maxTemp: `${parseInt(json.main.temp_max)}°C`,
          feelsLike: `${parseInt(json.main.feels_like)}°C`,
          windSpeed: `${parseFloat(json.wind.speed)} km/h`,
          windDegree: `${parseInt(json.wind.deg)}°`,
          description: json.weather[0].description,
          main: json.weather[0].main,
          sunrise: `${parseInt(json.sys.sunrise)}`,
          sunset: `${parseInt(json.sys.sunset)}`,
        };

        const weatherDisplay = new WeatherDisplay();
        weatherDisplay.updateWeatherInfo(weatherData);
        
        const weatherImage = new WeatherImage(json.weather[0].main);
        weatherImage.updateImageSource();

        const weatherList = new WeatherList();
        weatherList.createListItems(weatherData);

      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class WeatherDisplay {
  constructor() {
    this.weatherElement = document.getElementsByClassName("card-title")[0];
    this.humidityElement = document.getElementsByClassName("card-title")[1];
    this.countryElement = document.getElementsByClassName("card-title")[2];
  }
  updateWeatherInfo(weatherData) {
    this.weatherData = weatherData;
    this.weatherElement.innerHTML = this.weatherData.temperature;
    this.humidityElement.innerHTML = this.weatherData.humidity;
    this.countryElement.innerHTML = this.weatherData.country;
  }
}

class WeatherImage {
    constructor(weatherType) {
      this.imageElement = document.getElementsByClassName("img-thumbnail")[0];
      this.weatherType = weatherType;
    }
  
    updateImageSource() {
      switch (this.weatherType) {
        case "Clear":
          this.imageElement.src = "images/clear.png";
          break;
        case "Rain":
          this.imageElement.src = "images/rain.png";
          break;
        case "Snow":
          this.imageElement.src = "images/snow.png";
          break;
        case "Clouds":
          this.imageElement.src = "images/cloud.png";
          break;
        case "Mist":
        case "Haze":
          this.imageElement.src = "images/mist.png";
          break;
        default:
          this.imageElement.src = "";
      }
    }
}

class WeatherList{

    constructor() {
        this.listElements = document.getElementsByClassName("list-1");
        this.listElements_2 = document.getElementsByClassName("list-2");
        this.listElements_3 = document.getElementsByClassName("list-3");
    }

    createListItems(weatherData) {
        const listItems = [
          { label: "Min Temp", value: weatherData.minTemp },
          { label: "Max Temp", value: weatherData.maxTemp },
          { label: "Feels Like", value: weatherData.feelsLike },
          { label: "Wind Speed", value: weatherData.windSpeed },
          { label: "Wind Degree", value: weatherData.windDegree },
          { label: "Description", value: weatherData.description },
          { label: "Sunrise Time", value: this.formatTime(weatherData.sunrise) },
          { label: "Sunset Time", value: this.formatTime(weatherData.sunset) },
        ];
    
        Array.from(this.listElements).forEach((listElement) => {
          listElement.innerHTML = ""; // Clear the list element before adding new items
    
          listItems.slice(0,3).forEach((item) => {
            const listItemElement = document.createElement("li");
            listItemElement.classList.add("list-item");
            const listItemText = document.createTextNode(`${item.label}: ${item.value}`);
            listItemElement.appendChild(listItemText);
            listElement.appendChild(listItemElement);
          });
        });

        Array.from(this.listElements_2).forEach((listElement_2) => {
            listElement_2.innerHTML = "";

            listItems.slice(3,6).forEach((item_2) => {
                const listItemElement_2 = document.createElement("li");
                listItemElement_2.classList.add("list-item");
                const listItemText_2 = document.createTextNode(`${item_2.label}: ${item_2.value}`);
                listItemElement_2.appendChild(listItemText_2);
                listElement_2.appendChild(listItemElement_2);
            });
        });

        Array.from(this.listElements_3).forEach((listElement_3) => {
            listElement_3.innerHTML = "";

            listItems.slice(6,9).forEach((item_3) => {
                const listItemElement_3 = document.createElement("li");
                listItemElement_3.classList.add("list-item");
                const listItemText_3 = document.createTextNode(`${item_3.label}: ${item_3.value}`);
                listItemElement_3.appendChild(listItemText_3);
                listElement_3.appendChild(listItemElement_3);
            });
        })
      }
    
      formatTime(timestamp) {
        const date = new Date(timestamp * 1000);
        const options = {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        return date.toLocaleTimeString([], options);
      }
}

const weatherApp = new WeatherApp();

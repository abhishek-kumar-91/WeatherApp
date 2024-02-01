import Header from "./components/Header";
import "../src/App.css";
import searchIcon from "../src/assets/search.png";
import weatherPng from "../src/assets/weather.png";
import minMaxPng from "../src/assets/minMax.png";
import humidityPng from "../src/assets/humidity.png";
import directionPng from "../src/assets/direction.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {
  const apiKey = "65748bcff59279f8c39540e973aa21ca";
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("Pune");
  const [data, setData] = useState(null);
  const [lon, setLon] = useState(73.8553);
  const [lat, setLat] = useState(18.5196);
  const [days, setDays] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [unit, setUnit] = useState("metric");
  const [f, setF] = useState(null);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      // Fetch current weather data
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
      );
      const currentWeatherData = response.data;

      // Fetch forecast data
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const forecastData = forecastResponse.data;

      setData(currentWeatherData);
      setDays(forecastData.list.slice(0, 5));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors (e.g., display error message)
    }
  };

  console.log("Search Result ", data);
  const iconIdentifier = data?.weather[0]?.icon;
  const tempKelvin = data?.main?.temp;
  const tempCelsius = tempKelvin - 273.15;

  // const tempFahrenheit = (tempCelsius * 9/5) + 32;

  const tempMin = data?.main?.temp_min;
  const tempMinCelsius = tempMin - 273.15;

  const tempMax = data?.main?.temp_max;
  const tempMaxCelsius = tempMax - 273.15;

  const windSpeedMps = data?.wind?.speed;
  const windSpeedKmh = windSpeedMps * 3.6;

  function getWindDirection(degrees) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  const windDirectionDegree = data?.wind?.deg;
  const windDirection = getWindDirection(windDirectionDegree);

  const handleSearch = async () => {
    setSearch(location);
    await fetchData(); // Wait for fetchData to complete
    setLon(data?.coord?.lon);
    setLat(data?.coord?.lat);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=65748bcff59279f8c39540e973aa21ca`
      );
      const forecastData = response.data.list;
      setDays(forecastData.list.slice(0, 5));
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      // Handle errors (e.g., display error message)
    }
  };

  const toggleUnit = (selectedUnit) => {
    setUnit(selectedUnit);
    fetchData(); // Refetch data with the selected unit
    const tempFahrenheit = (tempCelsius * 9) / 5 + 32;
    setF(tempFahrenheit);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <>
      
      <div className="appContainer">
        <div className="marginContainer">
          {/* search code */}
          <div className="searchContainer">
            <div className="searchBox">
              <input
                type="text"
                name="search"
                placeholder="Search Location..."
                onChange={(e) => setLocation(e.target.value)}
              />
              <button onClick={handleSearch}>
                <img src={searchIcon} /> Search
              </button>
            </div>
            <div className="toggleBox">
              <input
                type="radio"
                name="unit"
                checked={unit === "metric"}
                onChange={() => toggleUnit("metric")}
              />{" "}
              <h6>Celsius</h6>
              <input
                type="radio"
                name="unit"
                checked={unit === "imperial"}
                onChange={() => toggleUnit("imperial")}
              />{" "}
              <h6>Fahrenheit</h6>
            </div>
          </div>

          <div className="weatherBox">
           <Link to={`/card/${data?.name}`} className="custom-link"> <div className="currentContainer">
              <div className="fourDivContainer">
                <div className="box1">
                  <h5>{data?.name}</h5> <h6>{data?.sys?.country}</h6>
                </div>
                <div className="box2">
                  <h1>
                    {unit === "metric"
                      ? (data?.main.temp - 273.15).toFixed(0)
                      : (((data?.main.temp - 273.15) * 9) / 5 + 32).toFixed(0)}
                    °{unit === "metric" ? "C" : "F"}
                  </h1>{" "}
                  <h6>{data?.weather[0]?.description}</h6>
                </div>
                <div className="box3">
                  <h6>
                    <img src={minMaxPng} /> {Math.floor(tempMinCelsius)} -{" "}
                    {Math.floor(tempMaxCelsius)}°C
                  </h6>

                  <h6>
                    <img src={humidityPng} /> {data?.main?.humidity}%
                  </h6>
                  <h6>
                    <img src={directionPng} /> {Math.floor(windSpeedKmh)}km/h -{" "}
                    {windDirection}
                  </h6>
                </div>
                <div className="box4">
                  <img
                    src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`}
                  />
                </div>
              </div>
              <div className="borderCurrentBox">
                <h4>Current Weather</h4>
              </div>
              
            </div></Link>
            <div className="daysContainer">
              <div className="forecastTitle">
                <h4>5 Days Forecast</h4>
              </div>
              <div className="forecastCardContainer">
                {days?.map((day, index) => (
                  <div className="forecastCard" key={index}>
                    <div className="dayBox1">
                      <h6>{formatDate(day.dt)}</h6>
                    </div>
                    <div className="dayBox2">
                      {" "}
                      <h1>
                        {unit === "metric"
                          ? (day.main.temp - 273.15).toFixed(0)
                          : (((day.main.temp - 273.15) * 9) / 5 + 32).toFixed(
                              0
                            )}
                        °{unit === "metric" ? "C" : "F"}
                      </h1>{" "}
                      {day.weather[0].description}
                    </div>
                    <div className="dayBox3">
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                        alt="Weather Icon"
                      />
                    </div>
                    <div className="dayBox4">
                      <h3>Day {index + 1}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

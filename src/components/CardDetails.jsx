import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../components/CardDetails.css"
import axios from 'axios';

function CardDetails() {
  const { id } = useParams();
  const apiKey = "65748bcff59279f8c39540e973aa21ca";
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      // Fetch current weather data
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${apiKey}`
      );
      const currentWeatherData = response.data;
      setData(currentWeatherData);
     
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors (e.g., display error message)
    }
  };

  useEffect(()=>{
    fetchData()
  },[])

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

  const tempCel = data?.main.temp - 273.15

  console.log("tempcel",tempCel)

  return (
    <div className='cardDetailsContainer'>
      <h1>{id} Weather Details</h1>
      <div className='detailsCard'>
          <div className='containerBox1'>
            <div className='cardBox'>
                <div className='description'><h3>Location  -{" "} </h3>{data?.name}</div>
                <div className='description'><h3>Minimum temperature -{" "}</h3>{Math.floor(tempMinCelsius)}°C </div>
                <div className='description'><h3>Maximum temperature -{" "}</h3>{Math.floor(tempMaxCelsius)}°C</div>
                <div className='description'><h3>Humidity -{" "}</h3>{data?.main?.humidity}%</div>
                <div className='description'><h3>Wind Speed & Direction -{" "}</h3>{Math.floor(windSpeedKmh)}km/h -{" "}
                    {windDirection}</div>
            </div>
            <div className='cardBox cardBoxIcon'>
            <img
                    src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`}
                  />
            </div>
            
            <div className='cardBox'>
            <h1>{Math.floor(tempCel).toFixed(0)}°C</h1>
            </div>
          </div>
          <div className='containerBox2'>Current Weather</div>
      </div>
    </div>
  )
}

export default CardDetails
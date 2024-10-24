import React, { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {  
      axios.get(`/api/weather?location=${query}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
    }
  }, [query]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setQuery(location);
      setLocation('');  
    }
  };

  let backgroundImage = '../public/assets/default.webp'; 

  if (data.weather) {
    if (data.weather[0].main === "Clouds") {
      backgroundImage = '../public/assets/cloud.webp';
    } else if (data.weather[0].main === "Clear") {
      backgroundImage = '../public/assets/sunny.webp';
    } else if (data.weather[0].main === "Rain"){
      backgroundImage = '../public/assets/rain.webp';
    }
  }

  const iconUrl = data.weather ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` : null;

  return (
    <div 
      className="app" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        position: 'absolute'
      }}
    >
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="header">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <p>{Math.round(data.main.temp - 273.15)}ºC</p> : null}
          </div>
          <div className="icon">
            {iconUrl ? <img src={iconUrl} alt="Weather Icon" className="weather-icon" /> : null}
          </div>
          <div className="description">
            {data.weather ? <p>Cloud: {data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom-header">
          <div className="feels-like">
            {data.main ? <p>Feels like: {Math.round(data.main.feels_like - 273.15)}ºC</p> : null}
          </div>
          <div className="humidity">
            {data.main ? <p>Humidity: {data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            {data.wind ? <p>Wind Speed: {data.wind.speed} mph</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

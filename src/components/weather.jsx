/* eslint-disable react/prop-types */
import "../css/weather.css";



export default function CurrentWeather ({ data }) {

    // set background based on weather icon
  const backgroundBox = data.weather[0].icon.slice(-1) === 'n' ? "url(https://i.pinimg.com/736x/c5/f4/7a/c5f47a8f566d3b22aaf51a47ebe1f1e7.jpg)"
  : "url(https://i.pinimg.com/736x/9f/35/66/9f3566d7a3c70ac9b1deb1068cb7961a.jpg)"; 

  // Apply style directly in JSX
  const weatherBoxStyle = {
    backgroundImage: backgroundBox
  };

    return (
      <div className="weather" style={weatherBoxStyle}>
        <div className="top">
          <div className="top-left">
            <p className="city">{data.city}</p>
            <p className="weather-description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
        </div>
        <div className="bottom">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Feels Like</span>
              <span className="parameter-value">{data.main.feels_like} °C</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} mb</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  
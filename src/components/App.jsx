

import '../css/App.css'
import Search from './search'
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api.jsx"
import CurrentWeather from "./weather.jsx"

//tools import 


import { useQuery } from "@tanstack/react-query";

import { useState } from 'react'
import Forecast from './forecast.jsx';

function App() {
  
  
  const [searchData, setSearchData] = useState(null);
  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);
  };

  // Extract lat and lon from search data
  const [lat, lon] = searchData ? searchData.value.split(" ") : [null, null];
  console.log(lat, lon);

  const currentWeatherQuery = useQuery({
    queryKey: ["currentWeather", lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Weather data fetch failed");
      }
      return response.json();
    },
    enabled: !!lat && !!lon,
  });

  const forecastQuery = useQuery({
    queryKey: ["forecast", lat, lon],
    queryFn: async () => {
      const response = await fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Forecast data fetch failed");
      }
      return response.json();
    },
    enabled: !!lat && !!lon,
  });
 
  // Combine loading and error states
  const isLoading = currentWeatherQuery.isLoading || forecastQuery.isLoading;
  const isError = currentWeatherQuery.isError || forecastQuery.isError;

  // Prepare data if both queries are successful
  const data =
    currentWeatherQuery.data && forecastQuery.data
      ? {
          currentWeather: {
            city: searchData.label,
            ...currentWeatherQuery.data,
          },
          forecast: {
            city: searchData.label,
            ...forecastQuery.data,
          },
        }
      : null;

    console.log(data);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />

      {isLoading && <div>Loading weather data...</div>}

      {isError && <div>Error fetching weather data</div>}

      {data && (
        <>
          <CurrentWeather data={data.currentWeather} />
          <Forecast data={data.forecast}/>
        </>
      )}
    </div>
  )
}

export default App

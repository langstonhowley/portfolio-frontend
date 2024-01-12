import axios from 'axios';
import './WeatherCurrent.css';

import { useState } from 'react';


export default function WeatherCurrent(){
    const [weather, setWeather] = useState(null);
  
    const requestWeather = () => {
        axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/weather', {city:"Detroit", country:"USA"}).then(res => {
        console.log(res)
        setWeather(res.data)
        })
    }

    return (
        <div>
        <button onClick={requestWeather}>
            Get Weather in Detroit
        </button>

        {weather && <h1>{weather.name}</h1>}
        {weather && <h2>{Math.floor(weather.main.temp)} °F</h2>}
        </div>
    );
}
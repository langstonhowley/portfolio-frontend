import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './WeatherBox.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';

const WeatherBox = () => {
    const locations = useMemo(() => {
        return ["Washington", "New York", "Detroit", "Porto", "Gibraltar", "Madrid", "Valencia", "London", "Paris", "Brussels", "Milan", "Warsaw", "Athens", "Istanbul"]
    }, [])
    
    const colorMap = useMemo(() => {
        return {
            clear: '#00A0B6',
            cloudy: '#F2F2F1',
            rain: '#004BF0',
            drizzle: '#004BF0',
            snow: '#FFFFFF',
            mist: '#CDE9FF',
            thunderstorm: '#E1C800'
        }
    }, [])
    
    const [weather, setWeather] = useState(null);
    const [weatherIconUrl, setWeatherIconUrl] = useState(null);
    const [currentLocationIdx, setCurrentLocationIdx] = useState(Math.floor(Math.random() * locations.length))
    const [weatherColor, setWeatherColor] = useState(colorMap['clear'])
    const [failedWeatherReqCount, setFailed] = useState(0)
    
    useEffect(() => {
        if(process.env.NODE_ENV !== 'development'){  
            let w = {
                "coord": {
                    "lon": 10.99,
                    "lat": 44.34
                },
                "weather": [
                    {
                    "id": 501,
                    "main": "Rain",
                    "description": "moderate rain",
                    "icon": "10d"
                    }
                ],
                "base": "stations",
                "main": {
                    "temp": 98.48,
                    "feels_like": 98.74,
                    "temp_min": 97.56,
                    "temp_max": 30.05,
                    "pressure": 1015,
                    "humidity": 64,
                    "sea_level": 1015,
                    "grnd_level": 933
                },
                "visibility": 10000,
                "wind": {
                    "speed": 0.62,
                    "deg": 349,
                    "gust": 1.18
                },
                "rain": {
                    "1h": 3.16
                },
                "clouds": {
                    "all": 100
                },
                "dt": 1661870592,
                "sys": {
                    "type": 2,
                    "id": 2075663,
                    "country": "IT",
                    "sunrise": 1661834187,
                    "sunset": 1661882248
                },
                "timezone": 7200,
                "id": 3163858,
                "name": "Zocca",
                "cod": 200
            }
            
            setWeather(w)
            setWeatherIconUrl('https://openweathermap.org/img/wn/' + w.weather[0].icon + '@2x.png')
        }else {
            if (failedWeatherReqCount < 2){
                axios.post(process.env.REACT_APP_BACKEND_BASE_URL + '/weather', {city:locations[currentLocationIdx]})
                .then(res => {
                    setWeather(res.data)
                    setWeatherIconUrl('https://openweathermap.org/img/wn/' + res.data.weather[0].icon + '@2x.png')
                })
                .catch(error => {
                    setFailed(failedWeatherReqCount + 1)
                })
            }
        }
    }, [currentLocationIdx, failedWeatherReqCount, locations])

    useEffect(() => {
        if(weather){
            if(Math.floor(weather.weather.code / 100) === 7){
                setWeatherColor(colorMap['mist'])
            }
            else {
                setWeatherColor(colorMap[weather.weather[0].main.toLowerCase()])
            }
        }
    }, [weather, colorMap])

    const incrementLoacationIdx = useCallback(() => {
        setCurrentLocationIdx((currentLocationIdx + 1) % locations.length)
    }, [currentLocationIdx, locations])

    const decrementLocationIdx = useCallback(() => {
        setCurrentLocationIdx((currentLocationIdx - 1) > 0 ? (currentLocationIdx - 1) : locations.length - 1)
    }, [currentLocationIdx, locations])

    useEffect(() => {
        const intervalId = setInterval(incrementLoacationIdx, 10000);
        return () => clearInterval(intervalId);
    }, [incrementLoacationIdx])

    const windDirection = (wd) => {
        if ((wd >= 0 && wd <= 11.25) || (wd > 348.75 && wd <= 360)){
            return "N";
        }
        else if (wd > 11.25 && wd <= 33.75){
            return "NNE";
        }
        else if (wd > 33.75 && wd <= 56.25){
            return "NE";
        }
        else if (wd > 56.25 && wd <= 78.75){
            return "ENE";
        }
        else if (wd > 78.75 && wd <= 101.25){
            return "E";
        }
        else if (wd > 101.25 && wd <= 123.75){
            return "ESE";
        }
        else if (wd > 123.75 && wd <= 146.25){
            return "SE";
        }
        else if (wd > 146.25 && wd <= 168.75){
            return "SSE";
        }
        else if (wd > 168.75 && wd <= 191.25){
            return "S";
        }
        else if (wd > 191.25 && wd <= 213.75){
            return "SSW";
        }
        else if (wd > 213.75 && wd <= 236.25){
            return "SW";
        }
        else if (wd > 236.25 && wd <= 258.75){
            return "WSW";
        }
        else if (wd > 258.75 && wd <= 281.25){
            return "W";
        }
        else if (wd > 281.25 && wd <= 303.75){
            return "WNW";
        }
        else if (wd > 303.75 && wd <= 326.25){
            return "NW";
        }
        else if (wd > 326.25 && wd <= 348.75){
            return "NNW";
        }
        else{
            return "(idk bro)"
        }
    }

    return (
        <div className='weatherbox' style={{borderColor: weatherColor, backgroundColor: weatherColor + "12"}}>
            <div className='wplace'>
                {weather && <button className='weatherSelector' onClick={decrementLocationIdx}>
                    <FontAwesomeIcon icon={faCaretLeft} className=''/>
                </button>}
                <p style={{alignSelf:'center'}}>{weather ? weather.name + ', ' + weather.sys.country  : 'Weather not available.'}</p>
                {weather && <button className='weatherSelector' onClick={incrementLoacationIdx}>
                    <FontAwesomeIcon icon={faCaretRight} className=''/>
                </button>}
            </div>
            {/* {weather && <hr style={{width: '90%', border: '1px solid white'}}/>} */}
            <div className='numbersHolder'>
                <div className='iconHolder'>
                    {weather && <p>{weather.weather[0].main}</p>}
                    {weather && <img src={weatherIconUrl} alt={weather.weather[0].description} title={weather.weather[0].description}/>}
                </div>
                <div className='temperature'>
                    {weather && <p>{Math.floor(weather.main.temp)} °F</p>}
                </div>
                <div className='wind'>
                    {weather && <p>Wind</p>}
                    {weather && <p>{Math.floor(weather.wind.speed)} mph {windDirection(weather.wind.deg)}</p>}
                </div>
            </div>
        </div>
    )
}

export default WeatherBox;
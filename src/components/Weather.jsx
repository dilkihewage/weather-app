import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import searchIcon from '../assets/search.jpeg'
import clearIcon from '../assets/clear.jpeg'
import cloudIcon from '../assets/cloud.png'
import drizzleIcon from '../assets/drizzle.png'
import rainIcon from '../assets/rain.png'
import snowIcon from '../assets/snow.png'
import windIcon from '../assets/wind.png'
import humidityIcon from '../assets/humidity.png'

const Weather = () => {
    const inputRef = useRef();
    const [weather, setWeatherData] = useState(null);
    const [fadeIn, setFadeIn] = useState(false);

    const allIcons = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": cloudIcon,
        "03n": cloudIcon,
        "04d": cloudIcon,
        "04n": cloudIcon,
        "09d": drizzleIcon,
        "09n": drizzleIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "11d": rainIcon,
        "11n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,
        "50d": humidityIcon,
        "50n": humidityIcon
    };

    const search = async (city) => {
        if (city === "") {
            alert("Please enter a city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const res = await fetch(url);
            const data = await res.json();

            if (!res.ok) {
                alert(data.message);
                return;
            }
            const icon = allIcons[data.weather[0].icon] || clearIcon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
            setFadeIn(false);
            setTimeout(() => setFadeIn(true), 50);
        } catch (error) {
            setWeatherData(false);
            console.error("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("London");
        setFadeIn(true);
    }, []);

    return (
        <div className='weather' style={{
            opacity: fadeIn ? 1 : 0,
            transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)"
        }}>
            <div className='search-bar'>
                <input ref={inputRef} placeholder='Search' />
                <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value)} />
            </div>
            {weather ? (
                <>
                    <img src={weather.icon} alt="" className='weather-icon' />
                    <p className='temperature'>{weather.temperature + "°C"}</p>
                    <p className='location'>{weather.location}</p>
                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidityIcon} alt="" />
                            <div>
                                <p>{weather.humidity + "%"}</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={windIcon} alt="" />
                            <div>
                                <p>{weather.windSpeed + " m/s"}</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default Weather


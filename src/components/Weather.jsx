import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

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
                country: data.sys.country,
                icon: icon,
                description: data.weather[0].description,
                temp_min: Math.floor(data.main.temp_min),
                temp_max: Math.floor(data.main.temp_max),
                pressure: data.main.pressure,
                visibility: data.visibility / 1000, // km
                windDeg: data.wind.deg,
                sunrise: data.sys.sunrise,
                sunset: data.sys.sunset,
                dt: data.dt,
                timezone: data.timezone
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

    // Helper functions for formatting
    const formatTime = (timestamp, tz) => {
        if (!timestamp) return "--";
        const date = new Date((timestamp + (tz || 0)) * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
    const formatDate = (timestamp, tz) => {
        if (!timestamp) return "--";
        const date = new Date((timestamp + (tz || 0)) * 1000);
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    };

    return (
        <div className='weather-main-bg'>
            <div className='weather-card' style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.7s cubic-bezier(.4,0,.2,1)"
            }}>
                {/* Header */}
                <div className="weather-header">
                    <span
                        className="weather-back"
                        onClick={() => navigate("/dashboard")}
                        title="Go to Dashboard"
                    >
                        {/* Unicode left arrow or SVG */}
                        &#8592;
                    </span>
                    <span className="weather-title">
                        <img src={cloudIcon} alt="" style={{ width: 32, verticalAlign: 'middle', marginRight: 8 }} />
                        Weather App
                    </span>
                </div>
                {/* Search */}
                <div className='search-bar'>
                    <input ref={inputRef} placeholder='Search' />
                    <img src={searchIcon} alt="" onClick={() => search(inputRef.current.value)} />
                </div>
                {/* Main Weather Info */}
                {weather && (
                    <>
                        <div className="weather-location-date">
                            <div className="weather-location-main">
                                <span className="weather-location">{weather.location}, {weather.country}</span>
                                <span className="weather-date">
                                    {formatTime(weather.dt, weather.timezone)}, {formatDate(weather.dt, weather.timezone)}
                                </span>
                            </div>
                        </div>
                        <div className="weather-main-row">
                            <div className="weather-main-col weather-main-icon">
                                <img src={weather.icon} alt="" style={{ width: 64, marginBottom: 8 }} />
                                <div className="weather-desc">{weather.description ? weather.description.replace(/\b\w/g, l => l.toUpperCase()) : ""}</div>
                            </div>
                            <div className="weather-main-col weather-main-temp">
                                <div className="weather-temp">{weather.temperature}°<span className="weather-temp-c">c</span></div>
                                <div className="weather-minmax">
                                    <div>Temp Min: {weather.temp_min}°c</div>
                                    <div>Temp Max: {weather.temp_max}°c</div>
                                </div>
                            </div>
                        </div>
                        {/* Bottom Info Bar */}
                        <div className="weather-bottom-bar">
                            <div className="weather-bottom-col">
                                <div><b>Pressure:</b> {weather.pressure}hPa</div>
                                <div><b>Humidity:</b> {weather.humidity}%</div>
                                <div><b>Visibility:</b> {weather.visibility}km</div>
                            </div>
                            <div className="weather-bottom-col">
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img src={windIcon} alt="" style={{ width: 22, marginRight: 6 }} />
                                    <span>{weather.windSpeed}m/s {weather.windDeg ? `${weather.windDeg}°` : ""}</span>
                                </div>
                            </div>
                            <div className="weather-bottom-col">
                                <div><b>Sunrise:</b> {formatTime(weather.sunrise, weather.timezone)}</div>
                                <div><b>Sunset:</b> {formatTime(weather.sunset, weather.timezone)}</div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <footer className="weather-footer">
                2025 Fidenz Technology
            </footer>
        </div>
    )
}

export default Weather


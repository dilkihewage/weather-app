import React, { useState, useRef } from "react";
import "./Weather.css";
import cloudIcon from "../assets/cloud.png";
import clearIcon from "../assets/clear.jpeg";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import humidityIcon from "../assets/humidity.png";

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

function formatTime(timestamp, tz) {
  if (!timestamp) return "--";
  const date = new Date((timestamp + (tz || 0)) * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function formatDate(timestamp, tz) {
  if (!timestamp) return "--";
  const date = new Date((timestamp + (tz || 0)) * 1000);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef();

  const handleAddCity = async () => {
    const city = input.trim();
    if (!city) return;
    
    if (cities.some(c => c.location.toLowerCase() === city.toLowerCase())) {
      setInput("");
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
      setCities(prev => [
        ...prev,
        {
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
          visibility: data.visibility / 1000,
          windDeg: data.wind.deg,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          dt: data.dt,
          timezone: data.timezone
        }
      ]);
      setInput("");
    } catch (error) {
      alert("Failed to fetch weather data.");
    }
  };

  return (
    <div className="weather-main-bg" style={{ minHeight: "100vh" }}>
      <header className="weather-header" style={{ justifyContent: "center" }}>
        <span className="weather-title">
          <img src={cloudIcon} alt="" style={{ width: 32, verticalAlign: 'middle', marginRight: 8 }} />
          Weather App Dashboard
        </span>
      </header>
      <div style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Search bar */}
        <div className="search-bar" style={{ maxWidth: 500, margin: "0 auto 32px auto" }}>
          <input
            ref={inputRef}
            placeholder="Enter a city"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAddCity(); }}
          />
          <button
            className="btn login-btn"
            style={{ width: "auto", padding: "0 18px", height: 40, marginLeft: 8 }}
            onClick={handleAddCity}
          >
            Add City
          </button>
        </div>
        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          width: "100%",
          maxWidth: 1100,
        }}>
          {cities.map((weather, idx) => (
            <div className="weather-card" style={{ background: "#3498f7", minWidth: 0 }} key={weather.location + idx}>
              <div className="weather-location-date" style={{ padding: "18px 24px 0 24px" }}>
                <div className="weather-location-main">
                  <span className="weather-location">{weather.location}, {weather.country}</span>
                  <span className="weather-date">
                    {formatTime(weather.dt, weather.timezone)}, {formatDate(weather.dt, weather.timezone)}
                  </span>
                </div>
              </div>
              <div className="weather-main-row" style={{ borderBottom: "none", padding: "8px 24px 0 24px" }}>
                <div className="weather-main-col weather-main-icon">
                  <img src={weather.icon} alt="" style={{ width: 48, marginBottom: 8 }} />
                  <div className="weather-desc">{weather.description ? weather.description.replace(/\b\w/g, l => l.toUpperCase()) : ""}</div>
                </div>
                <div className="weather-main-col weather-main-temp" style={{ alignItems: "flex-end" }}>
                  <div className="weather-temp" style={{ fontSize: "2.2rem" }}>{weather.temperature}°<span className="weather-temp-c">C</span></div>
                  <div className="weather-minmax">
                    <div>Temp Min: {weather.temp_min}°c</div>
                    <div>Temp Max: {weather.temp_max}°c</div>
                  </div>
                </div>
              </div>
              <div className="weather-bottom-bar" style={{ padding: "18px 18px" }}>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

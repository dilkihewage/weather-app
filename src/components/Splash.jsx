import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./splash.css"; 

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/login"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash" role="region" aria-label="App loading">
      {}
      <svg className="cloud cloud-a" viewBox="0 0 200 60" aria-hidden="true">
        <g opacity="0.6">
          <ellipse cx="40" cy="35" rx="35" ry="20"></ellipse>
          <ellipse cx="85" cy="28" rx="28" ry="18"></ellipse>
          <ellipse cx="120" cy="38" rx="38" ry="22"></ellipse>
          <rect x="20" y="40" width="120" height="16" rx="8"></rect>
        </g>
      </svg>
      <svg className="cloud cloud-b" viewBox="0 0 200 60" aria-hidden="true">
        <g opacity="0.45">
          <ellipse cx="50" cy="32" rx="32" ry="18"></ellipse>
          <ellipse cx="95" cy="26" rx="26" ry="16"></ellipse>
          <ellipse cx="132" cy="36" rx="32" ry="20"></ellipse>
          <rect x="30" y="38" width="120" height="14" rx="7"></rect>
        </g>
      </svg>

      {}
      <div className="splash-card">
        <img
          src={logo}
          width="96"
          height="96"
          alt="Weather App logo"
          className="splash-logo"
          loading="eager"
        />
        <h1 className="splash-title">
          Weather<span className="brand-accent">Cast</span>
        </h1>
        <p className="splash-sub">Your weather, at a glance.</p>

      
        <div className="splash-progress" aria-label="Loading">
          <div className="bar" />
        </div>

        <button
          className="splash-skip"
          onClick={() => navigate("/login")}
          aria-label="Skip splash and continue to login"
        >
          Skip
        </button>
      </div>
    </div>
  );
}

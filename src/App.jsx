import React from 'react'
import Weather from './components/Weather'
import LoginButton from "./components/Authentication/Login";
import LogoutButton from "./components/Authentication/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Splash from "./components/Splash";
import Dashboard from "./components/Dashboard";


function LoginRoute() {
  const { isLoading, error, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/weather", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="column">
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && (
        <>
          <LoginButton />
          <div className='app'></div>
        </>
      )}
    </main>
  );
}

function App() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  return (
    <>
      {/* Show LogoutButton only on dashboard, top right corner */}
      {isAuthenticated && location.pathname === "/dashboard" && (
        <div style={{
          position: "fixed",
          top: 24,
          right: 32,
          zIndex: 1000
        }}>
          <LogoutButton />
        </div>
      )}
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App

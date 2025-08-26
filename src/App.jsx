import React from 'react'
import Weather from './components/Weather'
import LoginButton from "./components/Authentication/Login";
import LogoutButton from "./components/Authentication/Logout";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Splash from "./components/Splash";


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
          <div className='app'>
           
          </div>
        </>
      )}
    </main>
  );
}

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      
      {isAuthenticated && (
        <div style={{
          position: "fixed",
          bottom: 30,
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
      </Routes>
    </Router>
  );
}

export default App

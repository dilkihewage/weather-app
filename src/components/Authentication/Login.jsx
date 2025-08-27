import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LoginButton({ className = '' }) {
  const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();
  const [clicking, setClicking] = React.useState(false);

  if (isLoading || isAuthenticated) return null;

  const handleLogin = async () => {
    try {
      setClicking(true);
      await loginWithRedirect({
        appState: { returnTo: "/weather" }
      });
    } catch (e) {
      console.error('Auth0 login error:', e);
    } finally {
      setClicking(false);
    }
  };

  return (
    <div className="login-bg">
      <div className={`login-card ${className}`} role="region" aria-label="Sign in">
        <div className="login-head">
          {/* Tiny cloud icon */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M6 18a4 4 0 0 1 0-8 5 5 0 0 1 9.58-1.65A3.5 3.5 0 1 1 18.5 18H6z"
              fill="var(--muted, #5B6B8A)"
            />
          </svg>
          <h2 style={{ color: "var(--text, #0B1220)" }}>Sign in to view the weather</h2>
          <p className="login-sub" style={{ color: "var(--muted, #5B6B8A)" }}>Secure login with Auth0</p>
        </div>

        {error && (
          <p className="login-error" role="alert">
            {error.message || 'Authentication error. Please try again.'}
          </p>
        )}

        <button
          type="button"
          className="btn login-btn"
          onClick={handleLogin}
          disabled={clicking}
          aria-busy={clicking ? 'true' : 'false'}
        >
          {clicking ? 'Redirecting…' : 'Continue'}
        </button>
      </div>
    </div>
  );
}


import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="logout-card">
                <button
                    style={{
                        padding: "12px 18px",
                        borderRadius: "10px",
                        border: "none",
                        background: "linear-gradient(90deg, #5ea0ff 0%, #500ae4 100%)",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1rem",
                        cursor: "pointer",
                        transition: "background 0.2s, box-shadow 0.2s"
                    }}
                    onClick={() => logout()}
                >
                    Sign Out
                </button>
            </div>
        )
    )
}

export default LogoutButton
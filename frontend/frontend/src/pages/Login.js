import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import './Login.css';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ email, password }),
            });

            const data = await response.text();

            if (response.ok) {
                // Token JWT
                login(data);
                navigate("/");
            } else {
                setMessage(data);
            }
        } catch (error) {
            console.error("Błąd:", error);
            setMessage("Wystąpił błąd. Spróbuj ponownie.");
        }
    };

    // return (
    //     <div style={{ textAlign: "center", marginTop: "50px" }}>
    //         <h2>Logowanie</h2>
    //         <form onSubmit={handleSubmit}>
    //             <input
    //                 type="email"
    //                 placeholder="Email"
    //                 value={email}
    //                 onChange={(e) => setEmail(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <input
    //                 type="password"
    //                 placeholder="Hasło"
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 required
    //             />
    //             <br />
    //             <button type="submit">Zaloguj się</button>
    //         </form>
    //         {message && <p style={{ marginTop: "10px", color: "red" }}>{message}</p>}
    //         <p>
    //             Nie masz konta? <Link to="/register">Zarejestruj się</Link>
    //         </p>
    //     </div>
    // );
    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Zaloguj się</h2>
                    <p className="login-subtitle">Wprowadź dane swojego konta</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Adres email</label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <input
                                id="email"
                                type="email"
                                placeholder="Wprowadź email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <div className="input-container">
                            <svg className="input-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input
                                id="password"
                                type="password"
                                placeholder="Wprowadź hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    {message && <div className="error-message">{message}</div>}

                    <button type="submit" className="login-button">Zaloguj się</button>
                </form>

                <div className="login-footer">
                    <p>Nie masz jeszcze konta?</p>
                    <Link to="/register" className="register-link">Zarejestruj się</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;

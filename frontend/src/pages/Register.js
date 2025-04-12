import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Register.css';

function Register() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({ email, password }),
            });

            const data = await response.text();

            setMessage(data);
            if (response.ok) {
                setMessageType("success");
                setTimeout(() => navigate("/login"), 1500); // przekierowanie po sukcesie
            } else {
                setMessageType("error");
            }
        } catch (error) {
            console.error("Błąd:", error);
            setMessage("Wystąpił błąd. Spróbuj ponownie.");
        }
    };

    // return (
    //     <div style={{ textAlign: "center", marginTop: "50px" }}>
    //         <h2>Rejestracja</h2>
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
    //             <button type="submit">Zarejestruj się</button>
    //         </form>
    //         {message && <p style={{ marginTop: "10px", color: "green" }}>{message}</p>}
    //         <p>
    //             Masz już konto? <Link to="/login">Zaloguj się</Link>
    //         </p>
    //     </div>
    // );
    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h2>Utwórz konto</h2>
                    <p className="register-subtitle">Dołącz do naszego teatru online</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
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
                                placeholder="Wprowadź adres email"
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
                                placeholder="Utwórz bezpieczne hasło"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <p className="password-hint">Hasło powinno zawierać min. 8 znaków</p>
                    </div>

                    {message && (
                        <div className={`message-box ${messageType === "success" ? "success-message" : "error-message"}`}>
                            {message}
                        </div>
                    )}

                    <button type="submit" className="register-button">Utwórz konto</button>
                </form>

                <div className="register-footer">
                    <p>Masz już konto?</p>
                    <Link to="/login" className="login-link">Zaloguj się</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;

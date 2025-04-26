import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            login(token);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userData = {
                id: payload.sub || payload.id,
                // email: payload.email,
                // role: payload.role, // jeśli masz role w tokenie
            };
            localStorage.setItem("authToken", token);
            setUser(userData);
            console.log(userData);
        } catch (e) {
            console.error("Nieprawidłowy token JWT.");
            logout(); // czyścimy wszystko, jeśli token był zły
        }
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
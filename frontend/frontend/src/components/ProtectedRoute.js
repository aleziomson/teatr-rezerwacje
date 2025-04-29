import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
    // użycie kontekstu, w celu autentykacji użytkownika
    const { user } = useAuth();

    // jesli użytkownik nie jest zalogowany
    if (!user) {
        // przeniesienie na stronę logowania
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;

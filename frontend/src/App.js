import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cennik from "./pages/Cennik";
import Regulamin from "./pages/Regulamin";
import Repertuar from "./pages/Repertuar";
import Spektakle from "./pages/Spektakle";
import Seats from "./pages/Seats";
import MojeRezerwacje from "./pages/MojeRezerwacje"; // NOWE
import Navbar from "./components/Navbar";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { FontSizeProvider } from "./components/FontSizeContext";
import Home from "./pages/Home";

function App() {
  return (
    <AuthProvider>
      <FontSizeProvider>
        <Router>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cennik" element={<Cennik />} />
              <Route path="/regulamin" element={<Regulamin />} />
              <Route path="/repertuar" element={<Repertuar />} />
              <Route path="/spektakle" element={<Spektakle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/seats" element={<Seats />} />
              <Route path="/moje-rezerwacje" element={
                <ProtectedRoute>
                  <MojeRezerwacje />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </FontSizeProvider>
    </AuthProvider>
  );
}

export default App;

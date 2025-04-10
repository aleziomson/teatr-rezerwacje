import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cennik from "./pages/Cennik";
import Regulamin from "./pages/Regulamin";
import Repertuar from "./pages/Repertuar";
import Spektakle from "./pages/Spektakle";
import LoginRegister from "./pages/LoginRegister";
import Seats from "./pages/Seats";
import MojeRezerwacje from "./pages/MojeRezerwacje"; // NOWE

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <Router>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <nav>
            <Link to="/" style={{ margin: "0 10px" }}>Strona Główna</Link>
            <Link to="/repertuar" style={{ margin: "0 10px" }}>Spektakle</Link>
            <Link to="/cennik" style={{ margin: "0 10px" }}>Cennik</Link>
            <Link to="/regulamin" style={{ margin: "0 10px" }}>Regulamin</Link>
            <Link to="/spektakle" style={{ margin: "0 10px" }}>Repertuar</Link>
            {isLoggedIn && (
              <Link to="/moje-rezerwacje" style={{ margin: "0 10px" }}>
                Moje rezerwacje
              </Link>
            )}
          </nav>
          {isLoggedIn ? (
            <button onClick={handleLogout}>Wyloguj</button>
          ) : (
            <Link to="/login">
              <button>Zaloguj się / Zarejestruj się</button>
            </Link>
          )}
        </header>

        <Routes>
          <Route path="/" element={<h2>Witamy na stronie głównej teatru!</h2>} />
          <Route path="/cennik" element={<Cennik />} />
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/repertuar" element={<Repertuar />} />
          <Route path="/spektakle" element={<Spektakle />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/seats" element={<Seats />} />
          <Route path="/moje-rezerwacje" element={<MojeRezerwacje />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

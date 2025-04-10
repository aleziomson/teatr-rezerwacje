// src/Navbar.js
import React from "react";

function Navbar({ onLoginClick }) {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "20px", background: "#eee" }}>
      <div>
        <button>Strona Główna</button>
        <button>Repertuar</button>
        <button>Cennik</button>
        <button>Regulamin</button>
        <button>Spektakle</button>
      </div>
      <div>
        <button onClick={onLoginClick}>Zaloguj się / Zarejestruj się</button>
      </div>
    </nav>
  );
}

export default Navbar;
